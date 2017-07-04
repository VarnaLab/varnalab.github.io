
v.module.member = (config) => {

  var social = (member) =>
    Object.keys(member)
      .reduce((social, key) => {
        if (key === 'github' && member[key]) {
          social.push({
            icon: 'github',
            name: 'GitHub',
            url: 'https://github.com/' + member[key]
          })
        }
        else if (key === 'twitter' && member[key]) {
          social.push({
            icon: 'twitter',
            name: 'Twitter',
            url: 'https://twitter.com/' + member[key]
          })
        }
        return social
      }, [])

  return {social}
}
