import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertService } from './services/alert.service';
import { Alert } from './models/alert.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  // Estado da UI
  activeTab = signal<'feed' | 'tips'>('feed');
  showModal = signal<boolean>(false);
  alerts = signal<Alert[]>([]);
  loadingAlerts = signal<boolean>(false);

  // Estado do Formulário
  formDescription = '';
  formType: 'DISPOSAL' | 'RECYCLING' = 'DISPOSAL';
  formLatitude: number | null = null;
  formLongitude: number | null = null;
  photoPreview: string | null = null;
  photoBase64: string | null = null;

  // Estados Auxiliares
  gettingLocation = false;
  submitting = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private alertService: AlertService) {}

  ngOnInit() {
    this.loadAlerts();
  }

  loadAlerts() {
    this.loadingAlerts.set(true);
    this.alertService.getAlerts().subscribe({
      next: (data) => {
        this.alerts.set(data);
        this.loadingAlerts.set(false);
      },
      error: (err) => {
        console.error('Erro ao carregar alertas:', err);
        this.loadingAlerts.set(false);
      }
    });
  }

  openModal() {
    this.resetForm();
    this.showModal.set(true);
    // Captura transparente de coordenadas ao abrir o modal
    this.getCurrentLocation();
  }

  closeModal() {
    this.showModal.set(false);
    this.resetForm();
  }

  resetForm() {
    this.formDescription = '';
    this.formType = 'DISPOSAL';
    this.formLatitude = null;
    this.formLongitude = null;
    this.photoPreview = null;
    this.photoBase64 = null;
    this.errorMessage = null;
    this.successMessage = null;
    this.gettingLocation = false;
  }

  getCurrentLocation() {
    if (!navigator.geolocation) {
      this.errorMessage = 'A geolocalização não é suportada pelo seu navegador.';
      return;
    }

    this.gettingLocation = true;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.formLatitude = position.coords.latitude;
        this.formLongitude = position.coords.longitude;
        this.gettingLocation = false;
      },
      (error) => {
        console.error('Erro ao capturar geolocalização:', error);
        this.gettingLocation = false;
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            this.errorMessage = 'Permissão de geolocalização negada. Por favor, insira manualmente ou ative a permissão.';
            break;
          case error.POSITION_UNAVAILABLE:
            this.errorMessage = 'Informações de localização indisponíveis. Forneça manualmente.';
            break;
          case error.TIMEOUT:
            this.errorMessage = 'Tempo limite esgotado ao obter localização. Forneça manualmente.';
            break;
          default:
            this.errorMessage = 'Ocorreu um erro ao obter a localização. Forneça manualmente.';
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      
      // Validação rápida de tamanho (máx 5MB)
      if (file.size > 5 * 1024 * 1024) {
        this.errorMessage = 'A imagem é muito grande. O limite máximo é de 5MB.';
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        this.photoPreview = reader.result as string;
        this.photoBase64 = reader.result as string; // Contém a string base64 completa (com dataUrl prefix)
      };
      reader.readAsDataURL(file);
    }
  }

  submitAlert() {
    if (!this.formDescription.trim()) {
      this.errorMessage = 'Por favor, insira uma descrição do ponto.';
      return;
    }

    if (this.formLatitude === null || this.formLongitude === null) {
      this.errorMessage = 'As coordenadas são obrigatórias. Por favor, permita a geolocalização ou digite-as.';
      return;
    }

    this.submitting = true;
    this.errorMessage = null;

    const newAlert: Alert = {
      description: this.formDescription,
      type: this.formType,
      latitude: this.formLatitude,
      longitude: this.formLongitude,
      photo: this.photoBase64 || undefined
    };

    this.alertService.createAlert(newAlert).subscribe({
      next: () => {
        this.successMessage = 'Alerta cadastrado com sucesso!';
        this.submitting = false;
        setTimeout(() => {
          this.closeModal();
          this.loadAlerts();
        }, 1500);
      },
      error: (err) => {
        console.error('Erro ao salvar alerta:', err);
        this.errorMessage = 'Falha ao salvar o alerta na base de dados. Tente novamente.';
        this.submitting = false;
      }
    });
  }

  getGoogleMapsLink(lat: number, lng: number): string {
    return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  }
}
