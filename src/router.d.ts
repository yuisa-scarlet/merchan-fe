import "vue-router"

declare module "vue-router" {
  interface RouteMeta {
    requiresAuth?: boolean
    allowedRoles?: string[]
    hide?: boolean
  }
}
