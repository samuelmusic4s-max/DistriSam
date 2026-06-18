<script>
  let name = '';
  let phone = '';
  let email = '';
  let subject = '';
  let message = '';
  
  let isSubmitting = false;
  let showSuccess = false;

  async function handleSubmit() {
    isSubmitting = true;
    
    // Simular un envío de red
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    isSubmitting = false;
    showSuccess = true;
    
    // Resetear el formulario
    name = '';
    phone = '';
    email = '';
    subject = '';
    message = '';
    
    // Ocultar mensaje de éxito después de unos segundos
    setTimeout(() => {
      showSuccess = false;
    }, 5000);
  }
</script>

<div class="contact-form-card">
  <h2>Envíanos un Mensaje</h2>
  <p>Completa el formulario y te responderemos lo más pronto posible.</p>

  {#if showSuccess}
    <div class="success-message">
      <span class="material-symbols-outlined">check_circle</span>
      ¡Mensaje enviado con éxito! Te contactaremos pronto.
    </div>
  {/if}

  <form on:submit|preventDefault={handleSubmit}>
    <div class="form-grid">
      <div class="form-row">
        <div class="form-group">
          <input type="text" id="name" placeholder=" " bind:value={name} required disabled={isSubmitting}>
          <label for="name">Nombre completo</label>
        </div>
        <div class="form-group">
          <input type="tel" id="phone" placeholder=" " bind:value={phone} required disabled={isSubmitting}>
          <label for="phone">Teléfono / WhatsApp</label>
        </div>
      </div>

      <div class="form-group">
        <input type="email" id="email" placeholder=" " bind:value={email} disabled={isSubmitting}>
        <label for="email">Correo electrónico (Opcional)</label>
      </div>

      <div class="form-group">
        <select id="subject" bind:value={subject} disabled={isSubmitting}>
          <option value="" disabled selected></option>
          <option value="pedido">Realizar un pedido</option>
          <option value="asesoria">Asesoría de maquillaje</option>
          <option value="mayor">Compras al por mayor</option>
          <option value="otro">Otro</option>
        </select>
        <label for="subject" style="top:-0.5rem;font-size:12px;color:var(--muted)">Motivo del contacto</label>
        <span class="select-arrow material-symbols-outlined">expand_more</span>
      </div>

      <div class="form-group">
        <textarea id="message" rows="4" placeholder=" " bind:value={message} required disabled={isSubmitting}></textarea>
        <label for="message">Tu mensaje</label>
      </div>

      <div class="form-submit">
        <button type="submit" class="btn-submit" disabled={isSubmitting}>
          {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
          {#if !isSubmitting}
            <span class="material-symbols-outlined">arrow_forward</span>
          {:else}
            <span class="material-symbols-outlined spinner">sync</span>
          {/if}
        </button>
      </div>
    </div>
  </form>
</div>

<style>
  .contact-form-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 0.75rem;
    padding: 2.5rem;
    box-shadow: 0 10px 30px rgba(197, 160, 89, 0.05);
  }
  .contact-form-card h2 {
    font-family: var(--font-display);
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  .contact-form-card > p {
    font-size: 16px;
    color: var(--muted);
    margin-bottom: 2rem;
  }
  
  .success-message {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #e8f5e9;
    color: #2e7d32;
    padding: 1rem;
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
    font-size: 14px;
    font-weight: 500;
  }
  
  .form-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .form-row {
    display: grid;
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  @media (min-width: 768px) {
    .form-row { grid-template-columns: 1fr 1fr; }
  }
  
  .form-group {
    position: relative;
  }
  .form-group input,
  .form-group textarea,
  .form-group select {
    width: 100%;
    padding: 0.75rem 0;
    background: transparent;
    border: none;
    border-bottom: 1px solid #d1c5b4;
    font-family: var(--font-body);
    font-size: 16px;
    color: var(--fg);
    outline: none;
    transition: border-color 0.3s;
  }
  .form-group input:disabled,
  .form-group textarea:disabled,
  .form-group select:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  .form-group input:focus,
  .form-group textarea:focus,
  .form-group select:focus {
    border-color: var(--accent-deep);
  }
  .form-group label {
    position: absolute;
    left: 0;
    top: 0.75rem;
    font-size: 16px;
    color: var(--muted);
    transition: all 0.3s;
    pointer-events: none;
  }
  .form-group input:focus ~ label,
  .form-group input:not(:placeholder-shown) ~ label,
  .form-group textarea:focus ~ label,
  .form-group textarea:not(:placeholder-shown) ~ label {
    transform: translateY(-1.5rem) scale(0.85);
    color: var(--accent-deep);
  }
  .form-group textarea { resize: none; min-height: 100px; }
  .form-group select {
    appearance: none;
    cursor: pointer;
    padding-right: 2rem;
  }
  .select-arrow {
    position: absolute;
    right: 0;
    top: 0.75rem;
    color: var(--muted);
    pointer-events: none;
  }
  
  .form-submit {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
  }
  .btn-submit {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 2rem;
    background: var(--matte-black);
    color: var(--surface);
    border: none;
    border-radius: 0.25rem;
    font-family: var(--font-body);
    font-size: 12px;
    font-weight: 500;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.3s;
    box-shadow: 0 10px 30px rgba(26, 26, 26, 0.1);
  }
  .btn-submit:hover:not(:disabled) { background: var(--accent-deep); }
  .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }
  .btn-submit .material-symbols-outlined {
    font-size: 18px;
    transition: transform 0.2s;
  }
  .btn-submit:hover:not(:disabled) .material-symbols-outlined { transform: translateX(4px); }
  
  .spinner {
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    100% { transform: rotate(360deg); }
  }
</style>
