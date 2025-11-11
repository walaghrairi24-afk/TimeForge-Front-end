import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { GoalService, GoalRequestDTO } from '../services/goal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-goal',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './create-goal.component.html',
  standalone: true,
  styleUrl: './create-goal.component.css'
})
export class CreateGoalComponent {
  goalForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private goalService: GoalService,
    private router: Router
  ) {
    this.goalForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: [''],
      startDate: ['', Validators.required],
      endDate: [''],
      progress: [0, [Validators.min(0), Validators.max(100)]],
      status: ['Not Started'],
      priority: ['Medium'],
      ownerId: ['', [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit(): void {
    if (this.goalForm.valid) {
      this.isSubmitting = true;
      const goalData: GoalRequestDTO = {
        ...this.goalForm.value,
        // Conversion des dates si nécessaire
        startDate: new Date(this.goalForm.value.startDate).toISOString().split('T')[0],
        endDate: this.goalForm.value.endDate ?
          new Date(this.goalForm.value.endDate).toISOString().split('T')[0] :
          undefined
      };

      this.goalService.createGoal(goalData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.router.navigate(['/goals']);
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Erreur lors de la création:', error);
          alert('Erreur lors de la création de l\'objectif');
        }
      });
    } else {
      // Marquer tous les champs comme touchés pour afficher les erreurs
      this.markFormGroupTouched(this.goalForm);
    }
  }

  onCancel(): void {
    if (this.goalForm.dirty) {
      if (confirm('Voulez-vous vraiment annuler ? Les modifications seront perdues.')) {
        this.router.navigate(['/goals']);
      }
    } else {
      this.router.navigate(['/goals']);
    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control?.markAsTouched();
      }
    });
  }

  // Getters pour faciliter l'accès aux contrôles dans le template
  get title() { return this.goalForm.get('title'); }
  get startDate() { return this.goalForm.get('startDate'); }
  get ownerId() { return this.goalForm.get('ownerId'); }
  get progress() { return this.goalForm.get('progress'); }
}
