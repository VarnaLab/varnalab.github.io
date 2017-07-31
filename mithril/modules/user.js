
v.module.user = (config) => {

  var social = (known) =>
    Object.keys(known)
      .reduce((social, key) => {
        if (key === 'github' && known[key]) {
          social.push({
            icon: 'github',
            name: 'GitHub',
            url: 'https://github.com/' + known[key]
          })
        }
        else if (key === 'twitter' && known[key]) {
          social.push({
            icon: 'twitter',
            name: 'Twitter',
            url: 'https://twitter.com/' + known[key]
          })
        }
        return social
      }, [])

  return {social}
}
