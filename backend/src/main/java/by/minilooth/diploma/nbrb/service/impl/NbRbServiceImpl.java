package by.minilooth.diploma.nbrb.service.impl;

import by.minilooth.diploma.nbrb.beans.NbRbCurrency;
import by.minilooth.diploma.nbrb.proxy.NbRbProxy;
import by.minilooth.diploma.nbrb.service.NbRbService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NbRbServiceImpl implements NbRbService {

    @Autowired private NbRbProxy proxy;

    @Override
    public Float getUSDOfficialRate() {
        NbRbCurrency currency = proxy.getCurrency(USD_CURRENCY_ID);
        return currency.getOfficialRate();
    }

    @Override
    public Float getEUROfficialRate() {
        NbRbCurrency currency = proxy.getCurrency(EUR_CURRENCY_ID);
        return currency.getOfficialRate();
    }

    @Override
    public Float convertToUSD(Float byn) {
        Float rate = getUSDOfficialRate();
        return byn / rate;
    }

    @Override
    public Float convertToEUR(Float byn) {
        Float rate = getEUROfficialRate();
        return byn / rate;
    }

}
