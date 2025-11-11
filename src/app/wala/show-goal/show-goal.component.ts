import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GoalResponseDTO, GoalService } from '../services/goal.service';

@Component({
  selector: 'app-show-goal',
  imports: [CommonModule, RouterModule],
  templateUrl: './show-goal.component.html',
  standalone: true,
  styleUrl: './show-goal.component.css'
})
export class ShowGoalComponent implements OnInit {
  goal!: GoalResponseDTO;
  isLoading = false;
  goalId!: number;

  constructor(
    private goalService: GoalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.goalId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadGoal();
  }

  loadGoal(): void {
    this.isLoading = true;
    this.goalService.getGoalById(this.goalId).subscribe({
      next: (goal: GoalResponseDTO) => {
        this.goal = goal;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement:', error);
        this.isLoading = false;
        alert('Erreur lors du chargement de l\'objectif');
      }
    });
  }

  onEdit(): void {
    this.router.navigate(['/goals', this.goalId, 'edit']);
  }

  onBack(): void {
    this.router.navigate(['/goals']);
  }

  onDelete(): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet objectif ? Cette action est irréversible.')) {
      this.goalService.deleteGoal(this.goalId).subscribe({
        next: () => {
          this.router.navigate(['/goals']);
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          alert('Erreur lors de la suppression de l\'objectif');
        }
      });
    }
  }

  getProgressColor(progress: number): string {
    if (progress >= 100) return 'completed';
    if (progress >= 75) return 'high-progress';
    if (progress >= 50) return 'medium-progress';
    if (progress >= 25) return 'low-progress';
    return 'minimal-progress';
  }

  getPriorityBadgeClass(priority: string): string {
    switch (priority?.toLowerCase()) {
      case 'high': return 'high';
      case 'medium': return 'medium';
      case 'low': return 'low';
      default: return 'medium';
    }
  }

  getStatusBadgeClass(status: string): string {
    switch (status?.toLowerCase()) {
      case 'completed': return 'completed';
      case 'in progress': return 'in-progress';
      case 'not started': return 'not-started';
      case 'cancelled': return 'cancelled';
      default: return 'not-started';
    }
  }
}
