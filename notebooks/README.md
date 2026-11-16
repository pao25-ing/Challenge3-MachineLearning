# Cuadernos del proyecto

## 01. Análisis exploratorio del dataset

En [01_analisis_dataset.ipynb](01_analisis_dataset.ipynb) se revisan los archivos de la competición, las dimensiones de las imágenes, el rango de sus píxeles y la distribución de las clases. También se muestran ejemplos de entrenamiento y validación. Los resultados están guardados dentro del cuaderno y se pueden consultar directamente en GitHub.

[**Abrir el cuaderno en Google Colab**](https://colab.research.google.com/github/pao25-ing/Challenge3-MachineLearning/blob/main/notebooks/01_analisis_dataset.ipynb)

### Ejecución en Google Colab

1. Descargar los datos desde [Kaggle](https://www.kaggle.com/competitions/tnm-112-lab-2-2026/data) y descomprimirlos.
2. En Google Drive, crear la carpeta `Challenge3/data` dentro de **Mi unidad**.
3. Colocar `train.h5`, `valid.h5` y `test_x.h5` en esa carpeta. La subida puede tardar por el tamaño de los archivos.
4. Abrir el cuaderno con el enlace de Colab. En el menú **Entorno de ejecución**, seleccionar **Ejecutar todas**.
5. Cuando se solicite, autorizar el acceso a Google Drive. Si se usó otra carpeta, modificar la variable `DATOS` en la primera celda de código.

Los resultados aparecerán debajo de cada celda. El cuaderno consulta los archivos en Drive; no entrena modelos ni realiza envíos a Kaggle.

### Ejecución local con Jupyter

Se necesita Python y los archivos `.h5` en la carpeta `data/` del repositorio. Desde la raíz del proyecto:

```bash
python -m pip install -r requirements-eda.txt
jupyter notebook
```

En Jupyter se abre `notebooks/01_analisis_dataset.ipynb` y se ejecutan las celdas en orden. Si la carpeta de datos se encuentra en otra ubicación, se modifica la variable `DATOS` en la primera celda. El análisis guardado también está disponible en [results/eda](../results/eda/README.md).


## 02. Entrenamiento y evaluación de la CNN

[**Abrir en Google Colab**](https://colab.research.google.com/github/pao25-ing/Challenge3-MachineLearning/blob/main/notebooks/02_entrenamiento_cnn.ipynb) · [Ver notebook](02_entrenamiento_cnn.ipynb)

El cuaderno es independiente: carga los tres HDF5 oficiales, compara cinco configuraciones de CNN, calcula Balanced Accuracy y otras métricas, guarda curvas y matriz de confusión, y genera candidatos CSV. Contiene los cuatro autores del grupo. No realiza envíos automáticos a la competición.

**Estado:** ejecutado completamente en Kaggle con los HDF5 oficiales. Las ocho celdas conservan sus salidas reales. La ejecución en CPU duró 39 min 23 s. [Ver ejecución original](https://www.kaggle.com/code/cesarapcho/challenge-3-upch-grupo-1-cnn-pcam?scriptVersionId=370083154) y [resultados publicados](../results/cnn/README.md). El cuaderno es compatible con Colab; las salidas guardadas proceden de Kaggle.

### En Colab

1. Colocar los tres HDF5 descomprimidos en `Mi unidad/Challenge3/data`.
2. Abrir el enlace, elegir una GPU y seleccionar **Ejecutar todas**.
3. Autorizar Google Drive. Los resultados se guardan en `Mi unidad/Challenge3/results/cnn`.
4. Esperar el mensaje final y comprobar `estado_ejecucion.json`. Si no aparece, la ejecución completa no ha terminado.
5. Guardar una copia del cuaderno ejecutado en GitHub para que se vean las salidas.

### En Kaggle

1. Descargar `02_entrenamiento_cnn.ipynb` desde GitHub e importarlo en un notebook de Kaggle.
2. Añadir los datos de la competición desde **Add Input**, activar GPU y ejecutar todas las celdas.
3. Guardar la versión con **Save & Run All**. Los resultados están en `/kaggle/working/results/cnn`.

### Local

Instalar `python -m pip install -r requirements-cnn.txt`, abrir el notebook en Jupyter y ejecutar en orden. Puede definirse `CHALLENGE3_DATOS` si los HDF5 se encuentran en otra carpeta. El entrenamiento en CPU puede tardar considerablemente más.

Antes de convertir los candidatos en `submission.csv`, se debe confirmar la correspondencia de los ID. La [guía de entrega](../docs/ENTREGA_KAGGLE.md) explica este pendiente y cómo registrar los envíos.

