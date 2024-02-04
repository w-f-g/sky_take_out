type Config = {
  path: string,
  sort?: number,
  meta: {
    icon?: string,
    hidden?: boolean,
    title: string,
  }
}

const modules = import.meta.glob('@/pages/admin/*/index.vue')
const configsMap: Record<string, Config> = import.meta.glob('@/pages/admin/*/config.ts', { import: 'default', eager: true })
const configs = Object.entries(configsMap).sort(([, a], [, b]) => {
  const aSort = a.sort ?? 0
  const bSort = b.sort ?? 0
  return aSort - bSort
})

const adminRoutes = configs.map(([k, v]) => {
  const componentPath = k.replace('config.ts', '') + 'index.vue'
  const component = modules[componentPath]
  const routeName = v.path.split('/').filter(Boolean).join('_')
  return {
    path: v.path,
    name: routeName,
    component,
    meta: v.meta,
  }
})

export default adminRoutes