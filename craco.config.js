module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        const sassRule = webpackConfig.module.rules.find(
          (rule) => rule.oneOf && Array.isArray(rule.oneOf)
        );
        sassRule.oneOf.forEach((loader) => {
          if (loader.test && loader.test.toString().includes("scss|sass")) {
            loader.use.forEach((useEntry) => {
              if (
                useEntry.loader &&
                useEntry.loader.includes("sass-loader")
              ) {
                useEntry.options = {
                  ...useEntry.options,
                  sassOptions: {
                    quietDeps: true, // Giảm cảnh báo về thư viện phụ thuộc
                  },
                };
              }
            });
          }
        });
        return webpackConfig;
      },
    },
  };
  