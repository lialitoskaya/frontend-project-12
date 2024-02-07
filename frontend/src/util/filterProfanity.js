import LeoProfanity from "leo-profanity";

const filterProfanity = LeoProfanity;
filterProfanity.add(filterProfanity.getDictionary("ru"));
filterProfanity.add(filterProfanity.getDictionary("en"));

export default filterProfanity;
