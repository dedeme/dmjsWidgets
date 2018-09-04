module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always",
            {"omitLastInOneLineBlock": true}
        ],

        "eqeqeq": [
            "error",
            "always"
        ],

        "valid-jsdoc": [
            "error"
        ],
        "array-callback-return": [
            "error"
        ],
        "consistent-return": [
            "error"
        ],
        "guard-for-in": [
            "error"
        ],
        "no-else-return": [
            "error",
            {"allowElseIf": false}
        ],
        "no-implicit-coercion": [
            "error"
        ],
        "no-implied-eval": [
            "error"
        ],
        "no-invalid-this": [
            "error"
        ],
        "no-multi-spaces": [
            "error"
        ],
        "no-new": [
            "error"
        ],
        "no-new-func": [
            "error"
        ],
        "no-new-wrappers": [
            "error"
        ],
        "no-use-before-define": [
            "error"
        ],
        "no-self-compare": [
            "error"
        ],
        "no-unused-expressions": [
            "error"
        ],
        "no-useless-return": [
            "error"
        ],
        "no-void": [
            "error"
        ],
        "no-with": [
            "error"
        ],
        "radix": [
            "error",
            "as-needed"
        ],
        "require-await": [
            "error"
        ],
        "new-parens": [
            "error"
        ],
        "block-spacing":  [
            "error"
        ],
        "brace-style": [
            "error"
        ],
        "comma-spacing": [
            "error"
        ],
        "computed-property-spacing": [
            "error"
        ],
        "consistent-this": [
            "error", "self"
        ],
        "dot-location": [
            "error",
            "property"
        ],
        "func-call-spacing": [
            "error", "never"
        ],
        "key-spacing": [
            "error"
        ],
        "lines-between-class-members": [
            "error"
        ],
        "no-array-constructor": [
            "error"
        ],
        "no-lonely-if": [
            "error"
        ],
        "no-tabs": [
            "error"
        ],
        "no-unneeded-ternary": [
            "error"
        ],
        "no-whitespace-before-property": [
            "error"
        ],
        "object-curly-spacing": [
            "error"
        ],
        "quote-props": [
            "error"
        ],
        "semi-spacing": [
            "error"
        ],
        "space-before-blocks": [
            "error"
        ],
        "space-before-function-paren": [
            "error"
        ],
        "space-in-parens": [
            "error"
        ],
        "space-infix-ops": [
            "error",
            {"int32Hint": true}
        ],
        "space-unary-ops": [
            "error",
            {"words": true, "nonwords": false}
        ],
        "switch-colon-spacing": [
            "error"
        ],
        "arrow-spacing": [
            "error"
        ],
        "no-duplicate-imports": [
            "error"
        ],
        "no-useless-computed-key": [
            "error"
        ],
        "no-useless-constructor": [
            "error"
        ],
        "no-useless-rename": [
            "error"
        ],
        "no-var": [
            "error"
        ],
        "object-shorthand": [
            "error"
        ],
        "prefer-const": [
            "error"
        ],
        "prefer-rest-params": [
            "error"
        ],
        "prefer-spread": [
            "error"
        ],
        "rest-spread-spacing": [
            "error"
        ],
        "template-curly-spacing": [
            "error"
        ],
    }
};
