import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useReceitasStore } from '../../stores/receitasStore';
import { useUserStore } from '../../stores/userStore';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { 
  ChevronLeft, 
  Clock, 
  Star, 
  ChefHat, 
  Heart, 
  Edit, 
  Trash2, 
  DollarSign,
  Printer,
  FileDown,
  Loader2
} from 'lucide-react';
import { CATEGORIAS_RECEITA, DIFICULDADES } from '../../lib/constants';
import { cn } from '../../lib/utils';
import { ReceitaPrintView } from '../../components/receitas/ReceitaPrintView';

export function ReceitaDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useUserStore();
  const { 
    receitaAtual: r, 
    fetchReceitaById, 
    isLoading, 
    deleteReceita, 
    toggleFavorito,
    fetchCusto,
    fetchExecucoesByReceita,
    execucoes
  } = useReceitasStore();

  const [custoInfo, setCustoInfo] = useState<any>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  useEffect(() => {
    if (id) {
      fetchReceitaById(id);
      fetchCusto(id).then(setCustoInfo);
      fetchExecucoesByReceita(id);
    }
  }, [id, fetchReceitaById, fetchCusto, fetchExecucoesByReceita]);

  if (isLoading || !r) {
    return <div className="flex h-64 items-center justify-center">Carregando receita...</div>;
  }

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir esta receita?')) {
      await deleteReceita(r.id);
      navigate('/receitas');
    }
  };

  const handleExportPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      // Logic for PDF export would go here
      // For now, we simulate a delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      window.print();
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const categoriaLabel = CATEGORIAS_RECEITA.find(c => c.value === r.categoria)?.label;
  const dificuldadeInfo = DIFICULDADES.find(d => d.value === r.dificuldade);
  const tempoTotal = r.tempoPreparo + r.tempoCozimento;

  const formatarTempo = (minutos: number) => {
    if (minutos < 60) return `${minutos} min`;
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    return mins > 0 ? `${horas}h ${mins}min` : `${horas}h`;
  };

  const obterCorDificuldade = (dif: string) => {
    switch (dif) {
      case 'UM': return 'text-green-500';
      case 'DOIS': return 'text-blue-500';
      case 'TRES': return 'text-yellow-500';
      case 'QUATRO': return 'text-orange-500';
      case 'CINCO': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  const canEditOrDelete = user?.id === r.autorId || user?.toolRole === 'ADMINISTRADOR';

  return (
    <>
      <div className="pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500 print:hidden">
      <Button variant="ghost" size="sm" className="mb-6 -ml-2" asChild>
        <Link to="/receitas">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Voltar para lista
        </Link>
      </Button>

      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-8">
          <div className="relative aspect-video w-full overflow-hidden rounded-3xl shadow-lg group">
            {r.imagemPrincipal ? (
              <img
                src={r.imagemPrincipal}
                alt={r.nome}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <ChefHat className="h-20 w-20 text-muted-foreground/20" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between text-white">
              <div className="space-y-1">
                <h1 className="text-3xl font-black md:text-4xl">{r.nome}</h1>
                <p className="text-white/80">{categoriaLabel} • {r.rendimentoQuantidade} {r.rendimentoDescricao}</p>
              </div>
            </div>
          </div>

          <Tabs defaultValue="ingredientes" className="w-full">
            <TabsList className="grid w-full grid-cols-4 rounded-xl bg-muted/50 p-1">
              <TabsTrigger value="ingredientes" className="rounded-lg">Ingredientes</TabsTrigger>
              <TabsTrigger value="preparo" className="rounded-lg">Preparo</TabsTrigger>
              <TabsTrigger value="custos" className="rounded-lg">Custos</TabsTrigger>
              <TabsTrigger value="info" className="rounded-lg">Informações</TabsTrigger>
            </TabsList>

            <TabsContent value="ingredientes" className="space-y-4 mt-6">
              <div className="grid gap-3">
                {r.ingredientes.map((ing) => (
                  <div key={ing.id} className="flex items-center justify-between p-4 rounded-xl border bg-card/50 hover:bg-card transition-colors">
                    <span className="font-medium">{ing.nomeExibicao}</span>
                    <Badge variant="secondary" className="font-mono">
                      {Number(ing.quantidadeBase)} {ing.unidadeMedida}
                    </Badge>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="preparo" className="space-y-6 mt-6">
              {r.passos.map((passo) => (
                <div key={passo.id} className="flex gap-6 p-6 rounded-2xl border bg-card/50">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg">
                    {passo.ordem}
                  </div>
                  <div className="space-y-3">
                    <p className="text-lg leading-relaxed">{passo.descricao}</p>
                    {passo.tempoEspecifico && (
                      <Badge variant="outline" className="flex w-fit items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {passo.tempoEspecifico} min
                      </Badge>
                    )}
                    {passo.dicaExtra && (
                      <p className="text-sm text-muted-foreground italic bg-muted/50 p-3 rounded-lg border-l-4 border-primary">
                        Dica: {passo.dicaExtra}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </TabsContent>

            <TabsContent value="custos" className="space-y-6 mt-6">
              {!custoInfo || !custoInfo.estimado ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 bg-muted/20 rounded-2xl border border-dashed">
                  <DollarSign className="h-10 w-10 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Nenhuma estimativa de custo disponível</p>
                    <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                      Registre os preços dos ingredientes no menu "Minha Cozinha" para ver os cálculos automáticos.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Custo Total</p>
                        <p className="text-2xl font-black">R$ {custoInfo.estimado.toFixed(2)}</p>
                      </CardContent>
                    </Card>
                    <Card className="bg-primary/5 border-primary/20">
                      <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Por Porção</p>
                        <p className="text-2xl font-black">
                          R$ {(custoInfo.estimado / r.rendimentoQuantidade).toFixed(2)}
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="bg-green-500/5 border-green-500/20">
                      <CardContent className="p-4">
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">P.V. Sugerido ({r.fatorMultiplicador}x)</p>
                        <p className="text-2xl font-black text-green-600">R$ {(custoInfo.estimado * Number(r.fatorMultiplicador)).toFixed(2)}</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="rounded-xl border overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-muted">
                        <tr>
                          <th className="text-left p-3 font-semibold">Ingrediente</th>
                          <th className="text-right p-3 font-semibold">Qtd</th>
                          <th className="text-right p-3 font-semibold">Preço (Kg/Lt)</th>
                          <th className="text-right p-3 font-semibold">Subtotal</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {custoInfo.breakdown.map((item: any) => (
                          <tr key={item.nome}>
                            <td className="p-3">{item.nome}</td>
                            <td className="p-3 text-right">{item.quantidade} {item.unidade}</td>
                            <td className="p-3 text-right text-muted-foreground">R$ {item.precoEstimado?.toFixed(2) || '--'}</td>
                            <td className="p-3 text-right font-medium">R$ {item.custoEstimado?.toFixed(2) || '0.00'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="info" className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">Rendimento</p>
                    <p className="font-medium">
                      {r.rendimentoQuantidade} {r.rendimentoDescricao}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">Custo estimado</p>
                    <p className="font-medium">
                      {r.custoEstimadoCache
                        ? `R$ ${Number(r.custoEstimadoCache).toFixed(2)}`
                        : <span className="text-muted-foreground">Aguardando preços</span>
                      }
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">{r.nome}</CardTitle>
              <div className="flex flex-wrap gap-2">
                <Badge>{categoriaLabel}</Badge>
                {r.ocasiao.map((o) => (
                  <Badge key={o} variant="outline">{o}</Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {formatarTempo(tempoTotal)}
                </span>
                <span className={cn('flex items-center gap-1', obterCorDificuldade(r.dificuldade))}>
                  <Star className="h-4 w-4" />
                  {dificuldadeInfo?.label}
                </span>
              </div>

              <Button className="w-full" size="lg" asChild>
                <Link to={`/receitas/${r.id}/cozinhar`}>
                  <ChefHat className="h-5 w-5 mr-2" />
                  Cozinhar!
                </Link>
              </Button>

              {canEditOrDelete && (
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" asChild>
                    <Link to={`/receitas/${r.id}/editar`}>
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Link>
                  </Button>
                  <Button variant="destructive" size="icon" onClick={handleDelete}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      </div>
      <ReceitaPrintView receita={r} custoInfo={custoInfo} execucoes={execucoes} />
    </>
  );
}
