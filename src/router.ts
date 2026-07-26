// Generouted, changes to this file will be overridden
/* eslint-disable */

import { components, hooks, utils } from '@generouted/react-router/client'

export type Path =
  | `*`
  | `/`
  | `/app`
  | `/app/calendar`
  | `/app/dashboard`
  | `/app/profile`
  | `/app/projects`
  | `/app/reports`
  | `/app/settings`
  | `/app/team`
  | `/login`
  | `/signup`

export type Params = {
  '/*': { '*': string }
}

export type ModalPath = never

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
