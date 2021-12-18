package by.minilooth.diploma.nbrb.service;

public interface NbRbService {

    int USD_CURRENCY_ID = 840;
    int EUR_CURRENCY_ID = 978;

    Float getUSDOfficialRate();
    Float getEUROfficialRate();
    Float convertToUSD(Float byn);
    Float convertToEUR(Float byn);

}
