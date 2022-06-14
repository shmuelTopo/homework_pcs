const visitsCounter = (pageName) => {
  return (req, res, next) => {
    const cookieName = `${pageName}Visits`;
    const signedCookies = req.signedCookies || {};
    const timesVisited = signedCookies[cookieName] ? Number(signedCookies[cookieName]) + 1 : 1;
    global.visits = global.visits || {};
    global.visits[pageName] = timesVisited;

    res.cookie(cookieName, timesVisited, { signed: true, maxAge: 1000 * 60 * 60 * 24 * 365 });
    next();
  }
}


module.exports = visitsCounter;