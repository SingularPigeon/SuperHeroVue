<script setup>
defineProps({
  hero: Object,
})
</script>

<template>
  <div v-if="hero" class="card my-3 border-danger-subtle bg-dark h-100">
    <div class="row g-0">
      <div class="col-md-6">
        <img
          :src="hero.image.url"
          class="img rounded-start h-100 w-100 object-fit-cover"
          :alt="hero.name"
        />
      </div>
      <div class="col-md-6 text-bg-dark rounded">
        <div class="card-header p-4 border-bottom-1 border-danger-subtle">
          <h2 class="card-title">{{ hero.name }}</h2>
          <p class="card-text fs-5">
            Nombre completo: {{ hero.biography['full-name'] || 'Desconocido' }}
          </p>
          <p class="card-text fs-5">Origen: {{ hero.biography['place-of-birth'] }}</p>
          <p class="card-text fs-5">Aliases: {{ hero.biography['aliases'] }}</p>
          <p class="card-text fs-5">Conexiones: {{ hero.connections.relatives }}</p>
        </div>
        <div class="card-body p-4">
          <p class="card-text fs-5">Ocupación: {{ hero.work.occupation }}</p>
          <p class="card-text fs-5">Primera Aparición: {{ hero.biography['first-appearance'] }}</p>
          <p class="card-text fs-5">Género: {{ hero.appearance.gender }}</p>
          <p class="card-text fs-5">
            Raza:
            {{
              hero.appearance.race && hero.appearance.race !== 'null'
                ? hero.appearance.race
                : 'sin datos'
            }}
          </p>

          <span class="me-3 card-text fs-5"
            >Altura: {{ hero.appearance['height'].join(' | ') }}</span
          >
          <span class="card-text fs-5">Peso: {{ hero.appearance['weight'].join(' | ') }}</span>
          <p class="card-text fs-5">Alianzas: {{ hero.connections['group-affiliation'] }}</p>
        </div>
        <div
          class="card-footer border-top-1 border-danger-subtle d-flex align-items-center justify-content-between pt-5 px-4"
        >
          <p class="card-tex pt-4">
            <small> Publicado por: {{ hero.biography.publisher }}</small>
          </p>
          <img
            src="/img/sh2.jpg"
            class="img icono rounded-circle object-fit-cover"
            alt="logo dc comics"
          />
        </div>
      </div>
    </div>
  </div>
</template>
