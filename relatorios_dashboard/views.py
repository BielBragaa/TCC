from django.shortcuts import render
from django.http import JsonResponse
from cadastro_veiculo.models import Veiculo
from registro_entregadespesa.models import RegistroEntregaDespesa
from datetime import date, timedelta
from django.db.models import Sum


# Página inicial do dashboard
def dashboard(request):
    total_veiculos = Veiculo.objects.count()

    data_fim = date.today()
    data_inicio = data_fim - timedelta(days=7)
    registros = RegistroEntregaDespesa.objects.filter(data__range=(data_inicio, data_fim))

    total_ganho = sum(r.calcular_ganho() for r in registros)
    total_despesa = registros.aggregate(Sum('valor_despesa'))['valor_despesa__sum'] or 0
    lucro = total_ganho - total_despesa

    ultimos_registros = registros.order_by('-data')[:5]

    # Se a requisição for de API (React), retorna JSON
    if request.headers.get('Accept') == 'application/json':
        return JsonResponse({
            'total_veiculos': total_veiculos,
            'total_ganho': total_ganho,
            'total_despesa': total_despesa,
            'lucro': lucro,
            'ultimos_registros': [
                {
                    'data': r.data.strftime('%Y-%m-%d'),
                    'ganho': r.calcular_ganho(),
                    'despesa': r.valor_despesa,
                } for r in ultimos_registros
            ]
        })

    # Render HTML normalmente
    context = {
        'total_veiculos': total_veiculos,
        'total_ganho': total_ganho,
        'total_despesa': total_despesa,
        'lucro': lucro,
        'ultimos_registros': ultimos_registros,
    }
    return render(request, 'relatorios_dashboard/dashboard.html', context)


# Página de relatórios
def relatorios(request):
    data_fim = date.today()
    data_inicio = data_fim - timedelta(days=7)
    registros = RegistroEntregaDespesa.objects.filter(data__range=(data_inicio, data_fim))

    total_ganho = sum(r.calcular_ganho() for r in registros)
    total_despesa = registros.aggregate(Sum('valor_despesa'))['valor_despesa__sum'] or 0
    lucro = total_ganho - total_despesa

    # API JSON para o front-end
    if request.headers.get('Accept') == 'application/json':
        return JsonResponse({
            'registros': [
                {
                    'data': r.data.strftime('%Y-%m-%d'),
                    'ganho': r.calcular_ganho(),
                    'despesa': r.valor_despesa,
                } for r in registros
            ],
            'total_ganho': total_ganho,
            'total_despesa': total_despesa,
            'lucro': lucro,
            'data_inicio': data_inicio.strftime('%Y-%m-%d'),
            'data_fim': data_fim.strftime('%Y-%m-%d'),
        })

    # Render HTML normalmente
    context = {
        'registros': registros,
        'total_ganho': total_ganho,
        'total_despesa': total_despesa,
        'lucro': lucro,
        'data_inicio': data_inicio,
        'data_fim': data_fim,
    }
    return render(request, 'relatorios_dashboard/relatorios.html', context)


# API dedicada ao dashboard (React pode chamar direto)
def dashboard_data(request):
    total_veiculos = Veiculo.objects.count()

    data_fim = date.today()
    data_inicio = data_fim - timedelta(days=7)
    registros = RegistroEntregaDespesa.objects.filter(data__range=(data_inicio, data_fim))

    total_ganho = sum(r.calcular_ganho() for r in registros)
    total_despesa = registros.aggregate(Sum('valor_despesa'))['valor_despesa__sum'] or 0
    lucro = total_ganho - total_despesa

    ultimos_registros = registros.order_by('-data')[:5]

    return JsonResponse({
        'total_veiculos': total_veiculos,
        'total_ganho': total_ganho,
        'total_despesa': total_despesa,
        'lucro': lucro,
        'ultimos_registros': [
            {
                'data': r.data.strftime('%Y-%m-%d'),
                'ganho': r.calcular_ganho(),
                'despesa': r.valor_despesa,
            } for r in ultimos_registros
        ]
    })
