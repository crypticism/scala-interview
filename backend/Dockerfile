FROM python:3.10

WORKDIR /code

COPY ./Pipfile /code/Pipfile

RUN pip install --no-cache-dir --upgrade pipenv && pipenv install

COPY ./src /code/src

CMD ["pipenv", "run", "uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
