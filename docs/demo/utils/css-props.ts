const isSameDomain = (styleSheet: StyleSheet) => {
  if (!styleSheet.href) {
    return true;
  }
  return styleSheet.href.indexOf(window.location.origin) === 0;
};

export const getCSSCustomProps = (substring: string, ignoreList = []) => {
  const stylesheets = [...document.styleSheets]
    .filter((stylesheet) => isSameDomain(stylesheet));

  const allProps = stylesheets.reduce((finalArr, sheet) => {
    const rules = sheet?.cssRules || [];
    const styleRules = [];
    const styleRulesByRoot = [];

    for (const rule of rules) {
      if (rule instanceof CSSStyleRule) {
        const ruleIsIgnored = ignoreList.includes(rule.selectorText);
        // console.log('foooo', rule.selectorText)
        if (ruleIsIgnored) {
          console.log('ignored', rule.selectorText)
        }
        if (!ruleIsIgnored) {
          if (rule.selectorText === ':root') {
            styleRulesByRoot.push(rule);
          } else {
            styleRules.push(rule);
          }
        }
      }
    }

    const list = [...styleRulesByRoot, ...styleRules]
      .reduce((propValArr, rule) => {
        const props = [...rule.style]
          .map((propName) => {
            const name = propName?.trim() || '';
            const value = rule.style.getPropertyValue(propName).trim();
            return [name, value];
          });
        const customProperties = props.filter(([propName]) => propName.indexOf(substring) === 0);
        return propValArr.concat(customProperties);
      }, []);

    return finalArr.concat(list);
  }, []);

  // Create a map of properties to their last defined values
  const propMap = allProps.reduce((map, [name, value]) => {
    map[name] = value;
    return map;
  }, {});

  // Convert map back to array format
  return Object.entries(propMap);
};
