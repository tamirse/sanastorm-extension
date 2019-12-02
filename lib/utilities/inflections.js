// NOUNS
export var NOMINATIVE = "nominative";
export var GENITIVE = "genitive";
export var PARTITIVE = "partitive";
export var INESSIVE = "inessive";
export var ELATIVE = "elative";
export var ILLATIVE = "illative";
export var ADESSIVE = "adessive";
export var ABLATIVE = "ablative";
export var ALLATIVE = "allative";
export var ESSIVE = "essive";
export var TRANSLATIVE = "translative";
export var ABESSIVE = "abessive";
export var COMITATIVE = "comitative";
export var NOMINATIVE_PLURAL = "pl_nominative";
export var GENITIVE_PLURAL = "pl_genitive";
export var PARTITIVE_PLURAL = "pl_partitive";
export var INESSIVE_PLURAL = "pl_inessive";
export var ELATIVE_PLURAL = "pl_elative";
export var ILLATIVE_PLURAL = "pl_illative";
export var ADESSIVE_PLURAL = "pl_adessive";
export var ABLATIVE_PLURAL = "pl_ablative";
export var ALLATIVE_PLURAL = "pl_allative";
export var ESSIVE_PLURAL = "pl_essive";
export var TRANSLATIVE_PLURAL = "pl_translative";
export var ABESSIVE_PLURAL = "pl_abessive";
export var COMITATIVE_PLURAL = "pl_comitative";

// VERBS
export var INFINITIVE = "inf1";
export var IMPERATIVE = "impr_2sg";
export var PASSIVE = "pres_pass";
export var PRESENT_1ST_SINGULAR = "pres_1sg";
export var PAST_1ST_SINGULAR = "past_1sg";
export var CONDITIONAL_1ST_SINGULAR = "cond_1sg";

var verbCodes = {
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

export var verbCodeToDescription = function verbCodeToDescription(code) {
  return verbCodes[code];
};

export var nounPlurCodeToDescription = function nounPlurCodeToDescription(code) {
  var nounCodes = {
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
    pl_abessive: "abessive plur.",
    pl_comitative: "comitative plur."
  };

  return nounCodes[code];
};

export var MINIMAL_KEYS = [NOMINATIVE, GENITIVE, PARTITIVE, ILLATIVE, INFINITIVE, // verbs
IMPERATIVE, PASSIVE];

export var EXPANDED_KEYS = [NOMINATIVE, GENITIVE, PARTITIVE, INESSIVE, ELATIVE, ILLATIVE, ADESSIVE, ABLATIVE, ALLATIVE, ESSIVE, TRANSLATIVE, ABESSIVE, COMITATIVE, INFINITIVE, // verbs
IMPERATIVE, PASSIVE, PRESENT_1ST_SINGULAR, PAST_1ST_SINGULAR, CONDITIONAL_1ST_SINGULAR];