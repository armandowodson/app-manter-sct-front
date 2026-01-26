export interface PermissaoModelo {
  idPermissao: number
  numeroPermissao: string
  numeroAlvara: string
  anoPermissao: string
  categoriaPermissao: number
  statusPermissao: number
  periodoInicialStatus: string
  periodoFinalStatus: string
  dataValidadePermissao: string
  dataValidadePermissaoOriginal: string
  penalidade: number
  dataValidadePenalidade: string
  usuario: string
  dataCriacao: string
  autorizacaoTrafego: string
  modalidade: number
  status: string
}
