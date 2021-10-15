package by.minilooth.diploma.security.jwt;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import by.minilooth.diploma.service.users.AuthService;
import by.minilooth.diploma.models.bean.users.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import org.apache.commons.lang3.StringUtils;

public class AuthTokenFilter extends OncePerRequestFilter {

    @Autowired private JwtUtils jwtUtils;
    @Autowired private AuthService authService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) 
        throws ServletException, IOException {
        try {
            final String cookie = Arrays.stream(request.getCookies()).filter(c -> c.getName().equals("token"))
                    .findAny().map(c -> URLDecoder.decode(c.getValue(), StandardCharsets.UTF_8)).orElse(null);

            if (StringUtils.isEmpty(cookie) || !cookie.startsWith("Bearer ")) {
                authService.removeTokenCookie(response);
                filterChain.doFilter(request, response);
                return;
            }

            final String token = cookie.split(" ")[1].trim();
            if (!jwtUtils.validateJwtToken(token)) {
                authService.removeTokenCookie(response);
                filterChain.doFilter(request, response);
                return;
            }

            User user = (User) authService.loadUserByUsername(jwtUtils.getUsername(token));
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    user, null, user == null ? List.of() : user.getAuthorities());

            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(authentication);

        }
        catch (NullPointerException ignored) {}

        filterChain.doFilter(request, response);
    }
}
