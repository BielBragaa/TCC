from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
import json
from .models import Postagem, AnuncioVeiculo

# -------- PÁGINA COMUNIDADE --------
def comunidade_page(request):
    """
    Renderiza a página HTML de comunidade com postagens e anúncios
    """
    postagens = Postagem.objects.order_by('-data_criacao')
    anuncios = AnuncioVeiculo.objects.order_by('-data_publicacao')
    return render(request, 'comunidade/index.html', {  # <-- ALTERAÇÃO AQUI
        'postagens': postagens,
        'anuncios': anuncios
    })


# -------- POSTAGENS API --------
@require_http_methods(["GET", "POST"])
@csrf_exempt
def postagens_api(request):
    if request.method == "GET":
        postagens = Postagem.objects.order_by("-data_criacao")
        data = [
            {
                "id": p.id,
                "titulo": p.titulo,
                "conteudo": p.conteudo,
                "autor": p.autor,
                "data_criacao": p.data_criacao.strftime("%Y-%m-%d %H:%M"),
            }
            for p in postagens
        ]
        return JsonResponse(data, safe=False)

    elif request.method == "POST":
        try:
            body = json.loads(request.body)
            postagem = Postagem.objects.create(
                titulo=body.get("titulo"),
                conteudo=body.get("conteudo"),
                autor=body.get("autor", "Anônimo"),
            )
            data = {
                "id": postagem.id,
                "titulo": postagem.titulo,
                "conteudo": postagem.conteudo,
                "autor": postagem.autor,
                "data_criacao": postagem.data_criacao.strftime("%Y-%m-%d %H:%M"),
            }
            return JsonResponse(data, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)


# -------- ANÚNCIOS API --------
@require_http_methods(["GET", "POST"])
@csrf_exempt
def anuncios_api(request):
    if request.method == "GET":
        anuncios = AnuncioVeiculo.objects.order_by("-data_publicacao")
        data = [
            {
                "id": a.id,
                "modelo": a.modelo,
                "ano": a.ano,
                "quilometragem": a.quilometragem,
                "preco": a.preco,
                "localizacao": a.localizacao,
                "link_externo": a.link_externo,
                "data_publicacao": a.data_publicacao.strftime("%Y-%m-%d %H:%M"),
            }
            for a in anuncios
        ]
        return JsonResponse(data, safe=False)

    elif request.method == "POST":
        try:
            body = json.loads(request.body)
            anuncio = AnuncioVeiculo.objects.create(
                modelo=body.get("modelo"),
                ano=body.get("ano"),
                quilometragem=body.get("quilometragem"),
                preco=body.get("preco"),
                localizacao=body.get("localizacao", ""),
                link_externo=body.get("link_externo", ""),
            )
            data = {
                "id": anuncio.id,
                "modelo": anuncio.modelo,
                "ano": anuncio.ano,
                "quilometragem": anuncio.quilometragem,
                "preco": anuncio.preco,
                "localizacao": anuncio.localizacao,
                "link_externo": anuncio.link_externo,
                "data_publicacao": anuncio.data_publicacao.strftime("%Y-%m-%d %H:%M"),
            }
            return JsonResponse(data, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
