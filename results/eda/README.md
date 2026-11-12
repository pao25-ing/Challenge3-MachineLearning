# Análisis exploratorio del dataset

Análisis de los tres archivos de [TNM112-Lab2 (2026)](https://www.kaggle.com/competitions/tnm-112-lab-2-2026) realizado el 11 de noviembre de 2026. Los resultados provienen de leer los archivos HDF5 completos facilitados para el proyecto. Este análisis no incluye entrenamiento ni métricas de modelos.

## Estructura y rangos

| Archivo | Claves | Dimensiones de `x` | Dimensiones de `y` | Tipo | Rango de píxeles | Media global de píxeles |
|---|---|---|---|---|---|---:|
| `train.h5` | `x`, `y` | 100 000 × 32 × 32 × 3 | 100 000 | `uint8` | 0–255 | 163,740 |
| `valid.h5` | `x`, `y` | 32 768 × 32 × 32 × 3 | 32 768 | `uint8` | 0–255 | 163,096 |
| `test_x.h5` | `x` | 32 768 × 32 × 32 × 3 | No contiene `y` | `uint8` | 0–255 | 160,398 |

La media corresponde a todos los valores de los píxeles y canales; no es una medida del desempeño del modelo. El archivo de prueba contiene solo `x`; la definición de `ID` para la submission requiere verificación adicional.

## Distribución de las etiquetas

| Conjunto | Clase 0 | Clase 1 | Total |
|---|---:|---:|---:|
| Entrenamiento | 49 964 (49,964 %) | 50 036 (50,036 %) | 100 000 |
| Validación | 16 399 (50,046 %) | 16 369 (49,954 %) | 32 768 |

Entrenamiento y validación tienen proporciones muy cercanas al 50 %. La distribución del conjunto de prueba es desconocida porque sus etiquetas no están disponibles. La métrica oficial es *balanced accuracy*, que promedia el recall de las clases; no debe argumentarse que estos conjuntos etiquetados están fuertemente desbalanceados.

![Distribución de clases](distribucion_clases.png)

![Ejemplos reales](ejemplos_imagenes.png)

Los ejemplos muestran los primeros cuatro índices disponibles de cada clase en cada conjunto; no son representativos de toda la variabilidad. Las imágenes son fragmentos del dataset y sus etiquetas provienen de los archivos originales. No son diagnósticos del equipo.

## Carga y preparación

```python
import h5py
with h5py.File("data/train.h5", "r") as archivo:
    imagenes = archivo["x"][:]
    etiquetas = archivo["y"][:]
print(imagenes.shape, etiquetas.shape)
```

Para la CNN se puede convertir cada lote a punto flotante y dividirlo entre 255, siempre aplicando la misma transformación a validación y prueba. Para evitar uso innecesario de memoria, conviene procesar por lotes. Entrenamiento y validación deben permanecer separados; cualquier ajuste aprendido del preprocesamiento se calcula únicamente con entrenamiento. La exploración del conjunto de prueba se limita aquí a su estructura y rango de píxeles.

## Reproducir

Desde la raíz del repositorio, descarga los tres archivos de Kaggle en `data/` e instala las dependencias:

```bash
python -m pip install -r requirements-eda.txt
python scripts/analisis_dataset.py --datos data --salida results/eda
```

También puedes abrir [el cuaderno de exploración](../../notebooks/01_analisis_dataset.ipynb) desde Jupyter o Colab. El script lee las imágenes por lotes, cuenta todas las etiquetas y genera las imágenes y tablas CSV de esta carpeta. Las figuras pueden usarse como apoyo para las diapositivas.

## Fuentes

- [Datos y descripción de la competición](https://www.kaggle.com/competitions/tnm-112-lab-2-2026/data).
- [PatchCamelyon benchmark](https://patchcamelyon.grand-challenge.org/).
- B. S. Veeling et al., [Rotation Equivariant CNNs for Digital Pathology](https://arxiv.org/abs/1806.03962), 2018.
