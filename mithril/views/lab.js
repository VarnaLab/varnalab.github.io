
v.view.lab = {
  view: (vnode) =>
    m('main.mdc-toolbar-fixed-adjust v-lab',
      m('h1.mdc-typography--headline', vnode.attrs.title),

      (vnode.attrs.view === 'lab' || null) && [
        m('p.mdc-typography--subheading2',
          'свободно място за споделяне',
          m('br'),
          'на знание, идеи и',
          m('br'),
          'технологии'
        ),

        m('a.mdc-button mdc-button--raised v-button', {
          href: '/lab/links',
          oncreate: m.route.link
          },
          'Открийте ни в мрежата'
        ),

        m('p.mdc-typography--body2', 'VarnaLab е независимо физическо място, развивано и използвано от хора с общи интереси, обикновено в сферата на компютрите, машините, технологиите, науката и цифровите или електронните изкуства, където те могат да се срещат, общуват и сътрудничат.'),
        m('p.mdc-typography--body2',
          'Всеки, който споделя тази иделогия',
          m('br'),
          'е добре дошъл!'
        ),
      ],

      (vnode.attrs.view === 'links' || null) &&
      m(v.component['list-links'], vnode.attrs)
    )
}
