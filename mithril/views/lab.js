
v.view.lab = {
  view: (vnode) =>
    m('main.mdc-toolbar-fixed-adjust v-lab',
      m('h1.mdc-typography--display1', vnode.attrs.title),

      m('p.mdc-typography--subheading2',
        'свободно място за споделяне',
        m('br'),
        'на знание, идеи и',
        m('br'),
        'технологии'
      ),

      m(v.component['list-links'], vnode.attrs)
    )
}
