// NON-VERBS
export const NOMINATIVE = "nominative";
export const GENITIVE = "genitive";
export const PARTITIVE = "partitive";
export const INESSIVE = "inessive";
export const ELATIVE = "elative";
export const ILLATIVE = "illative";
export const ADESSIVE = "adessive";
export const ABLATIVE = "ablative";
export const ALLATIVE = "allative";
export const ESSIVE = "essive";
export const TRANSLATIVE = "translative";
export const ABESSIVE = "abessive";
export const INSTRUCTIVE = "instructive";
export const COMITATIVE = "comitative";
export const NOMINATIVE_PLURAL = "pl_nominative";
export const GENITIVE_PLURAL = "pl_genitive";
export const PARTITIVE_PLURAL = "pl_partitive";
export const INESSIVE_PLURAL = "pl_inessive";
export const ELATIVE_PLURAL = "pl_elative";
export const ILLATIVE_PLURAL = "pl_illative";
export const ADESSIVE_PLURAL = "pl_adessive";
export const ABLATIVE_PLURAL = "pl_ablative";
export const ALLATIVE_PLURAL = "pl_allative";
export const ESSIVE_PLURAL = "pl_essive";
export const TRANSLATIVE_PLURAL = "pl_translative";
export const INSTRUCTIVE_PLURAL = "pl_instructive";
export const ABESSIVE_PLURAL = "pl_abessive";
export const COMITATIVE_PLURAL = "pl_comitative";

// VERBS
export const INFINITIVE = "inf1";
export const INFINITIVE_2 = "inf2";
export const INFINITIVE_3 = "inf3";
export const INFINITIVE_4 = "inf4";
export const INFINITIVE_5 = "inf5";
export const IMPERATIVE = "impr_2sg";
export const PASSIVE = "pres_pass";
export const PRESENT_1ST_SINGULAR = "pres_1sg";
export const PAST_1ST_SINGULAR = "past_1sg";
export const CONDITIONAL_1ST_SINGULAR = "cond_1sg";

/**
 * Map object between verb form code to descriptive string
 */
const verbCodes = {
  pres_1sg: "present 1st sing.",
  pres_2sg: "present 2nd sing.",
  pres_3sg: "present 3rd sing.",
  pres_1pl: "present 1st plur.",
  pres_2pl: "present 2nd plur.",
  pres_3pl: "present 3rd plur.",
  pres_neg: "present neg.",
  pres_pass: "present passive",
  pres_pass_neg: "present passive neg.",
  past_1sg: "past 1st sing.",
  past_2sg: "past 2nd sing.",
  past_3sg: "past 3rd sing.",
  past_1pl: "past 1st plur.",
  past_2pl: "past 2nd plur.",
  past_3pl: "past 3rd plur.",
  past_pass: "past passive",
  cond_1sg: "conditional 1st sing.",
  cond_2sg: "conditional 2nd sing.",
  cond_3sg_or_neg: "conditional 3rd sing. / neg.",
  cond_1pl: "conditional 1st plur.",
  cond_2pl: "conditional 2nd plur.",
  cond_3pl: "conditional 3rd plur.",
  cond_pass: "conditional passive",
  cond_pass_neg: "conditional passive neg.",
  impr_2sg: "imperative 2nd sing.",
  impr_3sg: "imperative 3rd sing.",
  impr_1pl: "imperative 1st plur.",
  impr_2pl: "imperative 2nd plur.",
  impr_3pl: "imperative 3rd plur.",
  impr_2sg_neg: "imperative 2nd sing. neg.",
  impr_neg: "imperative neg.",
  impr_pass: "imperative passive",
  impr_pass_neg: "imperative passive neg.",
  potn_1sg: "potential 1st sing.",
  potn_2sg: "potential 2nd sing.",
  potn_3sg: "potential 3rd sing.",
  potn_1pl: "potential 1st plur.",
  potn_2pl: "potential 2nd plur.",
  potn_3pl: "potential 3rd plur.",
  potn_neg: "potential neg.",
  potn_pass: "potential passive",
  potn_pass_neg: "potential passive neg.",
  pres_part: "present participle",
  pres_pass_part: "present passive participle",
  past_part: "past participle",
  past_pass_part: "past passive participle",
  agnt_part: "agent participle",
  nega_part: "neg. participle",
  inf1: "infinitive",
  inf1_long: "long infinitive",
  inf2: "2nd infinitive",
  inf2_pass: "2nd infinitive passive",
  inf3: "3rd infinitive",
  inf3_pass: "3rd infinitive passive",
  inf4: "4th infinitive",
  inf5: "5th infinitive",
  jA: "ja"
};

/**
 * Map between verb form code to descriptive string
 * @param {string} code
 */
export const verbCodeToDescription = code => {
  return verbCodes[code];
};

/**
 * Map between noun code to descriptive string
 * @param {string} code
 */
export const nounCodeToDescription = code => {
  const nounCodes = {
    pl_nominative: "nominative plur.",
    pl_genitive: "genitive plur.",
    pl_partitive: "partitive plur.",
    pl_inessive: "inessive plur.",
    pl_elative: "elative plur.",
    pl_illative: "illative plur.",
    pl_adessive: "adessive plur.",
    pl_ablative: "ablative plur.",
    pl_allative: "allative plur.",
    pl_essive: "essive plur.",
    pl_translative: "translative plur.",
    pl_instructive: "instructive plur.",
    pl_abessive: "abessive plur.",
    pl_comitative: "comitative plur."
  };

  if (nounCodes.hasOwnProperty(code)) {
    return nounCodes[code];
  } else {
    return code;
  }
};

export const MINIMAL_KEYS = {
  nouns: [NOMINATIVE, GENITIVE, PARTITIVE, ILLATIVE],
  verbs: [INFINITIVE, IMPERATIVE, PASSIVE]
};

export const getExpandedKeys = isVerb => {
  const field = isVerb ? "verbs" : "nouns";

  return new Promise((resolve, reject) => {
    chrome.storage.sync.get(defaultOptions, savedOptions => {
      try {
        const expandedKeys = [];

        Object.keys(savedOptions[field]).forEach(key => {
          if (savedOptions[field][key] === true) {
            expandedKeys.push(key);
          }
        });

        resolve(expandedKeys);
      } catch (error) {
        reject(error);
      }
    });
  });
};

export const EXPANDED_KEYS = {
  nouns: [
    NOMINATIVE,
    GENITIVE,
    PARTITIVE,
    INESSIVE,
    ELATIVE,
    ILLATIVE,
    ADESSIVE,
    ABLATIVE,
    ALLATIVE,
    ESSIVE,
    TRANSLATIVE,
    INSTRUCTIVE,
    ABESSIVE,
    COMITATIVE
  ],
  verbs: [
    INFINITIVE,
    INFINITIVE_2,
    INFINITIVE_3,
    INFINITIVE_4,
    INFINITIVE_5,
    IMPERATIVE,
    PASSIVE,
    PRESENT_1ST_SINGULAR,
    PAST_1ST_SINGULAR,
    CONDITIONAL_1ST_SINGULAR
  ]
};

export const defaultOptions = {
  verbs: {
    pres_1sg: true,
    pres_2sg: false,
    pres_3sg: false,
    pres_1pl: false,
    pres_2pl: false,
    pres_3pl: false,
    pres_neg: false,
    pres_pass: false,
    pres_pass_neg: false,
    past_1sg: true,
    past_2sg: false,
    past_3sg: false,
    past_1pl: false,
    past_2pl: false,
    past_3pl: false,
    past_pass: false,
    cond_1sg: false,
    cond_2sg: false,
    cond_3sg_or_neg: false,
    cond_1pl: false,
    cond_2pl: false,
    cond_3pl: false,
    cond_pass: false,
    cond_pass_neg: false,
    impr_2sg: false,
    impr_3sg: false,
    impr_1pl: false,
    impr_2pl: false,
    impr_3pl: false,
    impr_2sg_neg: false,
    impr_neg: false,
    impr_pass: false,
    impr_pass_neg: false,
    potn_1sg: false,
    potn_2sg: false,
    potn_3sg: false,
    potn_1pl: false,
    potn_2pl: false,
    potn_3pl: false,
    potn_neg: false,
    potn_pass: false,
    potn_pass_neg: false,
    pres_part: false,
    pres_pass_part: false,
    past_part: false,
    past_pass_part: false,
    agnt_part: false,
    nega_part: false,
    inf1: true,
    inf1_long: false,
    inf2: false,
    inf2_pass: false,
    inf3: false,
    inf3_pass: false,
    inf4: false,
    inf5: false
  },
  nouns: {
    nominative: true,
    genitive: true,
    partitive: true,
    inessive: true,
    elative: true,
    illative: true,
    adessive: true,
    ablative: true,
    allative: true,
    essive: true,
    translative: true,
    abessive: true,
    instructive: true,
    comitative: true
  }
};
