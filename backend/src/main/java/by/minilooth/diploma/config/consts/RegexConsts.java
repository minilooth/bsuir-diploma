package by.minilooth.diploma.config.consts;

public class RegexConsts {

    public final static class User {
        public final static String USERNAME_REGEX = "^[A-Za-z0-9_]+$";
        public final static String PHONE_NUMBER_REGEX = "^\\+375\\([0-9]{2}\\)[0-9]{3}-[0-9]{2}-[0-9]{2}$";
        public final static String PASSWORD_REGEX = "^[A-Z-a-z0-9!@$%^&*_]+$";
        public final static String FIRSTNAME_REGEX = "^[A-Za-zА-Яа-я -]+$";
        public final static String MIDDLENAME_REGEX = "^[A-Za-zА-Яа-я -]+$";
        public final static String LASTNAME_REGEX = "^[A-Za-zА-Яа-я -]+$";
    }

    public final static class Store {
        public final static String NAME_REGEX = "^[A-Za-zА-Яа-я0-9 #№()]+$";
    }

    public final static class Address {
        public final static String STREET_REGEX = "";
        public final static String HOUSE_REGEX = "";
        public final static String HOUSING_REGEX = "";
        public final static String ROOM_REGEX = "";
    }


}
