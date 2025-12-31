# Climate Warner

O Climate Warner é um sistema que transmite informações climaticas da região para usuário.

### Funcionamento

Funciona de forma simples, o usuário acessa o site e pode verificar as condições climáticas baseadas na localização atual do usuário.  
Em situações de condições climáticas severas (Como tempestades e vendavais), o sistema emite um alerta ao acessar o site.

Os usuários poderão verificar a previsão do clima do dia atual, bem como a previsão dos próximos 7 dias.

### Tecnologias

No desenvolvimento desse projeto, visei focar no estudo das funções asincrônas do `JavaScript`, além da utilização de `HTML 5` e `CSS 3` para a construção e estilização das elementos da página.

### APIs

- [Open-Meteo](https://open-meteo.com/): API climática gratuíta de código aberto. Veja a [configuração da API utilizada](https://open-meteo.com/en/docs?timezone=America%2FSao_Paulo&latitude=-22.7253&longitude=-47.6492&hourly=temperature_2m,wind_speed_10m,soil_temperature_6cm,weather_code,precipitation,apparent_temperature,precipitation_probability,relative_humidity_2m&daily=uv_index_max,precipitation_probability_max,weather_code,temperature_2m_max,temperature_2m_min&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,precipitation,weather_code&forecast_days=1#daily_weather_variables).
- [geolocalizator](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API): API nativa do `JavaScript`.