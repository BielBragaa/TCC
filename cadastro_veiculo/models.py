from django.db import models

class Veiculo(models.Model):
    CATEGORIA_CHOICES = [
        ('passeio', 'Passeio'),
        ('utilitario', 'Utilitário'),
    ]

    TIPO_CHOICES = [
        ('carro', 'Carro'),
        ('moto', 'Moto'),
    ]

    placa = models.CharField(max_length=10)
    modelo = models.CharField(max_length=100)
    categoria = models.CharField(max_length=10, choices=CATEGORIA_CHOICES, default='passeio')
    tipo = models.CharField(max_length=10, choices=TIPO_CHOICES, default='carro')
    km_por_l = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)

    def __str__(self):
        return f"{self.modelo} - {self.placa} - {self.categoria}" 
