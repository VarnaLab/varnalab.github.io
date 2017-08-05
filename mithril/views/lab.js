
v.view.lab = {
  view: (vnode) =>
    m('main.mdc-toolbar-fixed-adjust v-lab',
      m('h1.mdc-typography--display1', vnode.attrs.title),

      (vnode.attrs.view === 'lab' || null) && [
        m('p.mdc-typography--subheading2',
          'свободно място за споделяне',
          m('br'),
          'на знание, идеи и',
          m('br'),
          'технологии'
        ),

        m('ul.mdc-list mdc-list--avatar-list v-list v-links',
          m('a.mdc-list-item', {
            href: '/lab/links',
            oncreate: m.route.link
            },
            m('span.mdc-list-item__start-detail', {class: 'icon-www'}),
            'Връзки'
          ),
          m('a.mdc-list-item', {
            href: 'https://www.google.com/maps/place/VarnaLab/@43.21669,27.904608,16z/data=!4m5!3m4!1s0x0:0xf9c0fd8622b636aa!8m2!3d43.2166902!4d27.9046083?hl=en-US'
            },
            m('span.mdc-list-item__start-detail', {class: 'icon-location'}),
            m('span.mdc-list-item__text',
              'гр. Варна,',
              m('span.mdc-list-item__text__secondary',
                'ул. Пенчо Славейков № 50'
              )
            )
          )
        )
      ],

      (vnode.attrs.view === 'links' || null) &&
      m(v.component['list-links'], vnode.attrs)
    )
}
