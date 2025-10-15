<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import Header from './components/Header.vue'
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
}

main {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

button {
  cursor: pointer;
  border: none;
  border-radius: 8px;
  font-family: inherit;
  transition: all 0.2s ease;
}

button:hover {
  transform: translateY(-1px);
}

.btn-primary {
  background-color: #000;
  color: white;
  padding: 12px 24px;
  font-weight: 500;
}

.btn-primary:hover {
  background-color: #333;
}

.btn-secondary {
  background-color: #e9ecef;
  color: #495057;
  padding: 8px 16px;
  font-weight: 500;
}

.btn-secondary:hover {
  background-color: #dee2e6;
}

.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #495057;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px;
  border: 2px solid #e9ecef;
  border-radius: 8px;
  font-size: 16px;
  font-family: inherit;
  transition: border-color 0.2s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #007bff;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 16px;
  color: #495057;
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon {
  width: 20px;
  height: 20px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #007bff;
  text-decoration: none;
  margin-bottom: 20px;
  font-weight: 500;
}

.back-link:hover {
  color: #0056b3;
}
</style>