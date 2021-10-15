package by.minilooth.diploma.security.jwt;

import java.util.Date;

import by.minilooth.diploma.models.bean.users.User;
import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
@Configuration
public class JwtUtils {

    private static final Logger LOGGER = LoggerFactory.getLogger(JwtUtils.class);

    @Value("${security.tokenSecret}")
    private String tokenSecret;

    @Value("${security.tokenExpirationInMs}")
    private Integer tokenExpirationInMs;

    @Value("${security.tokenIssuer}")
    private String tokenIssuer;

    public String generateJwtToken(User user) {
        return Jwts.builder()
                .setSubject(String.format("%s,%s", user.getId(), user.getUsername()))
                .setIssuer(tokenIssuer)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + tokenExpirationInMs))
                .signWith(SignatureAlgorithm.HS512, tokenSecret)
                .compact();
    }

    public String getUserId(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(tokenSecret)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject().split(",")[0];
    }

    public String getUsername(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(tokenSecret)
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject().split(",")[1];
    }

    public Date getExpirationDate(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(tokenSecret)
                .parseClaimsJws(token)
                .getBody();

        return claims.getExpiration();
    }

    public Boolean validateJwtToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(tokenSecret).parseClaimsJws(authToken);
            return true;
        }
        catch (SignatureException ex) {
            LOGGER.error("Invalid JWT signature: {}", ex.getMessage());
        }
        catch (MalformedJwtException ex) {
            LOGGER.error("Invalid JWT token: {}", ex.getMessage());
        }
        catch (ExpiredJwtException ex) {
            LOGGER.error("JWT token is expired: {}", ex.getMessage());
        }
        catch (UnsupportedJwtException ex) {
            LOGGER.error("JWT token is unsupported: {}", ex.getMessage());
        }
        catch (IllegalArgumentException ex) {
            LOGGER.error("JWT claims string is empty: {}", ex.getMessage());
        }

        return false;
    }
}
