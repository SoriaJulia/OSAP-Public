export enum UserRoles {
  PUBLICO = 'PUBLICO',
  AFILIADO = 'AFILIADO',
  PRESTADOR = 'PRESTADOR',
}

export type AuthUserRoles = Exclude<UserRoles, UserRoles.PUBLICO>;
