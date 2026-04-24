import { useReceitasStore } from '../stores/receitasStore';
import { useUserStore } from '../stores/userStore';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { ChefHat, Plus, Star, Clock, Heart } from 'lucide-react';
import { CATEGORIAS_RECEITA, DIFICULDADES } from '../lib/constants';
import { cn } from '../lib/utils';
import { ReceitaCard } from '../components/receitas/ReceitaCard';
import { useEffect } from 'react';

export function Home() {
  const { user } = useUserStore();
  const { receitas, fetchReceitas, fetchFavoritos } = useReceitasStore();

  useEffect(() => {
    fetchReceitas({ limite: 4 });
  }, [fetchReceitas]);

  const receitasRecentes = receitas.slice(0, 4);

  return (
    <div className="space-y-8 pb-10">
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-orange-500 to-red-600 p-8 text-white shadow-xl md:p-12">
        <div className="relative z-10 space-y-6 md:max-w-2xl">
          <Badge className="bg-white/20 text-white backdrop-blur-md border-none px-3 py-1">
            Olá, {user?.nome?.split(' ')[0]}! 👋
          </Badge>
          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            O que vamos cozinhar hoje?
          </h1>
          <p className="text-lg text-orange-50/90 md:text-xl">
            Gerencie suas receitas, planeje suas refeições e controle seus custos em um só lugar.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50" asChild>
              <Link to="/receitas/nova">
                <Plus className="mr-2 h-5 w-5" /> Nova Receita
              </Link>
            </Button>
            <Button size="lg" variant="secondary" className="bg-orange-400/20 text-white border-white/20 backdrop-blur-md hover:bg-orange-400/40" asChild>
              <Link to="/receitas">
                <ChefHat className="mr-2 h-5 w-5" /> Ver Todas
              </Link>
            </Button>
          </div>
        </div>
        <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-orange-400/20 blur-3xl" />
      </section>

      <div className="grid gap-8 md:grid-cols-3">
        <Card className="md:col-span-2 border-none shadow-md bg-white/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-bold">Receitas Recentes</CardTitle>
              <p className="text-sm text-muted-foreground">Suas últimas criações e descobertas</p>
            </div>
            <Button variant="ghost" asChild>
              <Link to="/receitas">Ver tudo</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {receitasRecentes.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {receitasRecentes.map((receita) => (
                  <ReceitaCard key={receita.id} receita={receita} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                <div className="rounded-full bg-muted p-4">
                  <ChefHat className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">Você ainda não tem receitas cadastradas.</p>
                <Button variant="outline" asChild>
                  <Link to="/receitas/nova">Começar agora</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card className="border-none shadow-md bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-5 w-5 fill-current" />
                Seus Favoritos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-indigo-50/80">
                Acesse rapidamente os pratos que você mais gosta de preparar.
              </p>
              <Button className="w-full bg-white text-indigo-600 hover:bg-indigo-50" asChild>
                <Link to="/minha-cozinha/favoritos">Abrir Favoritos</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Categorias Populares</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {CATEGORIAS_RECEITA.slice(0, 8).map((cat) => (
                  <Button
                    key={cat.value}
                    variant="outline"
                    size="sm"
                    className="rounded-full"
                    asChild
                  >
                    <Link to={`/receitas?categoria=${cat.value}`}>
                      {cat.label}
                    </Link>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
