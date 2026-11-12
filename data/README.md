# Datos de la competición

La competición [TNM112-Lab2 (2026)](https://www.kaggle.com/competitions/tnm-112-lab-2-2026/data) utiliza un subconjunto de PatchCamelyon (PCam). Cada imagen en estos archivos es un recorte RGB de **32 × 32 píxeles**. El PCam original contiene parches de 96 × 96; su etiqueta positiva se define según la presencia de tejido tumoral en la región central de 32 × 32. La competición indica que sus imágenes se recortaron a 32 × 32; no se verificó el procedimiento exacto de recorte.

## Archivos

| Archivo | Uso | Imágenes `x` | Etiquetas `y` | Tamaño |
|---|---|---:|---|---:|
| `train.h5` | Entrenamiento | 100 000 | Sí | 307 302 048 bytes |
| `valid.h5` | Validación | 32 768 | Sí | 100 698 112 bytes |
| `test_x.h5` | Predicción | 32 768 | No | 100 665 344 bytes |

`x` contiene arreglos de `(n, 32, 32, 3)` y `y` es un vector de tamaño `n`; ambas variables son `uint8`. Las etiquetas disponibles son 0 (negativa) y 1 (positiva). `test_x.h5` contiene solo la clave `x`: no incluye etiquetas ni identificadores. Confirmen la correspondencia entre el orden de las imágenes y los `ID` requeridos por Kaggle antes de producir un envío.

Descarga los tres `.h5` desde Kaggle y colócalos en esta carpeta. No se incluyen en Git por su tamaño; consulta las condiciones de uso de los datos en la competición. El análisis documentado, los gráficos y las instrucciones están en [results/eda](../results/eda/README.md).

## Fuentes

- [Datos de TNM112-Lab2 (2026)](https://www.kaggle.com/competitions/tnm-112-lab-2-2026/data).
- [PatchCamelyon benchmark](https://patchcamelyon.grand-challenge.org/).
- Veeling et al., [Rotation Equivariant CNNs for Digital Pathology](https://arxiv.org/abs/1806.03962), 2018.
