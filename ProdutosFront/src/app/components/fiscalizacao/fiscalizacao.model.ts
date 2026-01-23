export interface FiscalizacaoModelo {
    idFiscalizacao: number
    dataFiscalizacao: string
    dataFiscalizacaoOriginal: string
    idVeiculo: number
    placa: string
    marca: string
    modelo: string
    cor: string
    idPermissionario: number
    numeroPermissao: string
    nomePermissionario: string
    cnhPermissionario: string
    nomeDefensor: string
    cnhDefensor: string
    motivoInfracao: string
    tipoInfracao: string
    grupoMultas: string
    prazoRegularizacao: string
    prazoRegularizacaoOriginal: string
    naturezaInfracao: string
    modalidade: string
    penalidade: string
    observacao: string
    dataCriacao: string
    usuario: string
    status: string
}
