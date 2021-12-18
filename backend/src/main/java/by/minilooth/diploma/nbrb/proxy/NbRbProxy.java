package by.minilooth.diploma.nbrb.proxy;

import by.minilooth.diploma.nbrb.beans.NbRbCurrency;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Component
@FeignClient(name = "NB-RB-PROXY", url = "https://www.nbrb.by/api/exrates")
public interface NbRbProxy {

    @GetMapping("/rates/{currencyId}?parammode=1")
    NbRbCurrency getCurrency(@PathVariable("currencyId") Integer id);

}
