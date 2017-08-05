
v.module.user = (config) => {

  var social = (known) =>
    Object.keys(known)
      .reduce((social, key) => {
        if (key === 'github' && known[key]) {
          social.push({
            id: 'github',
            title: 'GitHub',
            url: 'https://github.com/' + known[key],
            icon: 'github',
          })
        }
        else if (key === 'twitter' && known[key]) {
          social.push({
            id: 'twitter',
            title: 'Twitter',
            url: 'https://twitter.com/' + known[key],
            icon: 'twitter',
          })
        }
        return social
      }, [])

  return {social}
}
