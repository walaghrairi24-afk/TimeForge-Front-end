import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GoalRequestDTO, GoalResponseDTO, GoalService } from '../services/goal.service';

@Component({
  selector: 'app-update-goal',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './update-goal.component.html',
  standalone: true,
  styleUrl: './update-goal.component.css'
})
export class UpdateGoalComponent implements OnInit {
  goalForm: FormGroup;
  isSubmitting = false;
  isLoading = false;
  goalId!: number;

  constructor(
    private fb: FormBuilder,
    private goalService: GoalService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.goalForm = this.createForm();
  }

  ngOnInit(): void {
    this.goalId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadGoal();
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

  loadGoal(): void {
    this.isLoading = true;
    this.goalService.getGoalById(this.goalId).subscribe({
      next: (goal: GoalResponseDTO) => {
        this.goalForm.patchValue({
          title: goal.title,
          description: goal.description || '',
          startDate: goal.startDate,
          endDate: goal.endDate || '',
          progress: goal.progress,
          status: goal.status,
          priority: goal.priority || 'Medium',
          ownerId: goal.ownerId
        });
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement:', error);
        this.isLoading = false;
        alert('Erreur lors du chargement de l\'objectif');
      }
    });
  }

  onSubmit(): void {
    if (this.goalForm.valid) {
      this.isSubmitting = true;
      const goalData: GoalRequestDTO = {
        ...this.goalForm.value,
        startDate: new Date(this.goalForm.value.startDate).toISOString().split('T')[0],
        endDate: this.goalForm.value.endDate ?
          new Date(this.goalForm.value.endDate).toISOString().split('T')[0] :
          undefined
      };

      this.goalService.updateGoal(this.goalId, goalData).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.router.navigate(['/goals']);
        },
        error: (error) => {
          this.isSubmitting = false;
          console.error('Erreur lors de la mise à jour:', error);
          alert('Erreur lors de la mise à jour de l\'objectif');
        }
      });
    } else {
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
