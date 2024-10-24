/** ------------------------------------------
 *  Autogenerated by ⛋ Terrazzo. DO NOT EDIT!
 * ------------------------------------------- */

export const tokens = {
  "typography.family.body": {
    ".": [
      "IBM Plex Sans",
      "-system-ui",
      "sans-serif"
    ],
  },
  "typography.family.heading": {
    ".": [
      "Helvetica"
    ],
  },
  "typography.largeTitle": {
    ".": {
      "fontFamily": [
        "Helvetica"
      ],
      "fontSize": {
        "value": 34,
        "unit": "px"
      },
      "fontWeight": 400,
      "lineHeight": "41px"
    },
    "xs": {
      "fontSize": {
        "value": 31,
        "unit": "px"
      },
      "lineHeight": "38px"
    },
    "s": {
      "fontSize": {
        "value": 32,
        "unit": "px"
      },
      "lineHeight": "39px"
    },
    "m": {
      "fontSize": {
        "value": 33,
        "unit": "px"
      },
      "lineHeight": "40px"
    },
    "l": {
      "fontSize": {
        "value": 34,
        "unit": "px"
      },
      "lineHeight": "41px"
    },
    "xl": {
      "fontSize": {
        "value": 36,
        "unit": "px"
      },
      "lineHeight": "43px"
    },
    "2xl": {
      "fontSize": {
        "value": 38,
        "unit": "px"
      },
      "lineHeight": "46px"
    },
    "3xl": {
      "fontSize": {
        "value": 40,
        "unit": "px"
      },
      "lineHeight": "48px"
    },
  },
  "typography.body": {
    ".": {
      "fontFamily": [
        "Helvetica"
      ],
      "fontSize": {
        "value": 17,
        "unit": "px"
      },
      "fontWeight": 400,
      "lineHeight": "22px"
    },
    "xs": {
      "fontSize": {
        "value": 14,
        "unit": "px"
      },
      "lineHeight": "19px"
    },
    "s": {
      "fontSize": {
        "value": 15,
        "unit": "px"
      },
      "lineHeight": "20px"
    },
    "m": {
      "fontSize": {
        "value": 16,
        "unit": "px"
      },
      "lineHeight": "21px"
    },
    "l": {
      "fontSize": {
        "value": 17,
        "unit": "px"
      },
      "lineHeight": "22px"
    },
    "xl": {
      "fontSize": {
        "value": 19,
        "unit": "px"
      },
      "lineHeight": "24px"
    },
    "2xl": {
      "fontSize": {
        "value": 21,
        "unit": "px"
      },
      "lineHeight": "26px"
    },
    "3xl": {
      "fontSize": {
        "value": 23,
        "unit": "px"
      },
      "lineHeight": "29px"
    },
  },
};

/** Get individual token */
export function token(tokenID, modeName = ".") {
  return tokens[tokenID]?.[modeName];
}
