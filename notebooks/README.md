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
