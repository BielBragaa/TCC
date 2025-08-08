from django.shortcuts import render, redirect
from .forms import VeiculoForm
from .models import Veiculo

def index(request):
    form = VeiculoForm(request.POST or None)
    if request.method == 'POST' and form.is_valid():
        form.save()
        return redirect('cadastro_veiculo')

    veiculos = Veiculo.objects.all()
    return render(request, 'cadastro_veiculo/index.html', {
        'form': form,
        'veiculos': veiculos
        
    })
