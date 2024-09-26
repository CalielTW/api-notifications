module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', ['chore', 'feat', 'fix', 'style', 'build']],
        'subject-case': [0],
        'subject-empty': [2, 'never'],
        'subject-full-stop': [0, 'never'],
        'subject-max-length': [2, 'always', 100],
        'type-case': [0],
        'type-empty': [2, 'never'],
        'type-max-length': [2, 'always', 15],
        'header-max-length': [2, 'always', 150],
        'scope-case': [0],
        'scope-empty': [0],
        'scope-max-length': [0],
        'references-empty': [0],
        'signed-off-by': [0],
        'body-leading-blank': [0],
        'body-max-length': [0],
        'body-min-length': [0],
        'footer-leading-blank': [0],
        'footer-min-length': [0],
    },
    parserPreset: {
        parserOpts: {
            headerPattern: /^(\w+)\/(\d+)\/(.*)$/,
            headerCorrespondence: ['type', 'number', 'subject'],
        },
    },
}
