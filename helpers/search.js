module.exports = (query, name, objectSearch) => {
  
    if(query[name]) {
      objectSearch[name] = query[name].trim();
  
      const regex = new RegExp(objectSearch[name], "i");
      objectSearch[`${name}Regex`] = regex;
    }

  }