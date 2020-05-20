export class StringUtils {

    static titleCase(str: string) {

        const formatterString = str.toLowerCase().split(' ').map(function (word) {
            return word.replace(word[0], word[0].toUpperCase());
        }).join(' ');

        return formatterString;
    }

    static toBoolean(input: string): boolean | undefined {
        try {
            return JSON.parse(input);

        } catch (e) {

            return undefined;
        }
    }

    static formatAll(input, replacements) {

        // var replacements = { "%NAME%": "Mike", "%AGE%": "26", "%EVENT%": "20" },
        //     str = 'My Name is %NAME% and my age is %AGE%.';

        input = input.replace(/%\w+%/g, function (all) {
            return replacements[all] || all;
        });

        return input;
    }

    static format(input, replacement) {

        // var replacements = { "%NAME%": "Mike", "%AGE%": "26", "%EVENT%": "20" },
        //     str = 'My Name is %NAME% and my age is %AGE%.';

        input = input.replace(/\{0\}/g, replacement);

        return input;
    }
}
