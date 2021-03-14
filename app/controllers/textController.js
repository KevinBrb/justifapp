const jwt = require('jsonwebtoken');
const User = require('../models/User');

const textController = {    
    /**
     * @param {string} req.body - Text to justify
     * @param {object} res - The response with the justified text
     * @returns {object} res - response with status, content-type & the justified text
     * @example
     *      textController.justify()
     */
    justify: async (req, res) => {
        const user = await User.findByToken(req.headers.authorization);
        const numberOfWords = req.body.split(/\s+/).length;
        const paragraphes = req.body.split(/[\n\t]+/gm);
        const tempResult = [];
        const result = [];

        // update token rateLimit
        user.token.rateLimit = user.token.rateLimit - numberOfWords;

        // Check rateLimit
        if(user.token.rateLimit < 0) {
            const wordsLeft = user.token.rateLimit + numberOfWords;
            user.token.rateLimit = 0;
            res.status(402).json({ message: `${wordsLeft} characters left. Wait for tomorrow or get VIP access with unlimited amount of words !` });
        } else if (user.token.rateLimit === 0) {
            res.status(402).json({ message: `0 characters left. Wait for tomorrow or get VIP access with unlimited amount of words !` });
        } else {
            // For each paragraph, create a list of words and send it to justificationMethod
            for (let i = 0; i < paragraphes.length; i++) {
                const wordsOfParagraphe = paragraphes[i].split(" ");
                const justifiedParagraphe = textController.justificationMethod(wordsOfParagraphe, 80);
                tempResult.push(justifiedParagraphe.join("\n"));
            } 

            result.push(tempResult.join("\n"));

            // To update rateLimit in database
            const dataForUpdate = {
                token: {
                    value: user.token.value,
                    rateLimit: user.token.rateLimit
                }
            }

            await User.findByEmailAndUpdate(user.email, dataForUpdate);

            res.status(200).set("Content-Type", "text/plain").send(result.join("\n"));
        }
    },

    /**
     * @param {string[]} words - Array of words to justify
     * @param {number} maxCharacter - The number of characters for each line
     * @returns {string[]} Array of line
     * @example
     *      textController.justificationMethod(words, maxCharacter)
     */
    justificationMethod: (words, maxCharacter) => {
        let lines = [],
        index = 0;
    
        while (index < words.length) {
        let count = words[index].length;
        let last = index + 1;
    
        while (last < words.length) {
            if (words[last].length + count + 1 > maxCharacter) break;
            count += words[last].length + 1;
            last++;
        }
    
        let line = "";
        let difference = last - index - 1;
    
        // if last line words in the line is 1,left justify
        if (last === words.length || difference === 0) {
            for (let i = index; i < last; i++) {
            line += words[i] + " ";
            }
    
            line = line.substr(0, line.length - 1);
            for (let i = line.length; i < maxCharacter; i++) {
            line += " ";
            }
        } else {
            // equal amount of spaces between words 
            let spaces = (maxCharacter - count) / difference;
            let remainder = (maxCharacter - count) % difference;
    
            for (let i = index; i < last; i++) {
            line += words[i];
    
            if (i < last - 1) {
                let limit = spaces + (i - index < remainder ? 1 : 0);
                for (let j = 0; j <= limit; j++) {
                line += " ";
                }
            }
            }
        }
            lines.push(line);
            index = last;
        }
        return lines;
    }
}

module.exports = textController;