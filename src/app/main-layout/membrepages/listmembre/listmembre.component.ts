import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Membre} from "../../../models/membre";
import {MembreService} from "../../../services/membre.service";

@Component({
  selector: 'app-listmembre',
  templateUrl: './listmembre.component.html',
  styleUrls: ['./listmembre.component.css']
})
export class ListmembreComponent implements OnInit{
  members: Membre[] = [];
  filteredMembers: Membre[] = [];
  roleFilter: string = 'Tous';
  cinSearch: string = '';

  constructor(private memberService: MembreService, private router: Router) {}

  ngOnInit() {
    this.fetchMembers();
  }

  fetchMembers() {
    this.memberService.getAllMembreEntreprise().subscribe(
      (response: Membre[]) => {
        this.members = response;
        this.applyFilters();
      },
      (error: any) => {
        console.log('Error occurred while fetching members:', error);
      }
    );
  }

  applyFilters() {
    this.filteredMembers = this.members.filter((member: Membre) => {
      if (this.roleFilter !== 'Tous' && member.role !== this.roleFilter) {
        return false;
      }
      if (this.cinSearch && !member.cin.includes(this.cinSearch)) {
        return false;
      }
      return true;
    });
  }

  searchByCIN() {
    this.applyFilters();
  }

  deleteMember(member: Membre) {
    this.memberService.removeMembreEntreprise(member.cin.toString()).subscribe(
      (response: any) => {
        const index = this.members.indexOf(member);
        if (index !== -1) {
          this.members.splice(index, 1);
          this.applyFilters();
        }
      },
      (error: any) => {
        console.log('Error occurred while deleting member:', error);
      }
    );
  }

  addMember() {

    this.router.navigateByUrl('main/creemembre');
    console.log('Navigating to add member page...');
  }


  addMemberByExcel(file: File) {
    this.memberService.uploadFile(file).subscribe(
      (response: any) => {
        // Handle the successful file upload
        console.log('File uploaded successfully:', response);
        this.fetchMembers(); // Refresh the member list
      },
      (error: any) => {
        console.log('Error occurred while uploading file:', error);
      }
    );
  }

  downloadList() {
    this.memberService.downloadFile().subscribe(
      (response: Blob) => {
        // Create a download link for the CSV file
        const url = window.URL.createObjectURL(response);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'member-list.csv';
        link.click();
        window.URL.revokeObjectURL(url);
      },
      (error: any) => {
        console.log('Error occurred while downloading member list:', error);
      }
    );
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Process the selected file here
      // For example, you can read the file content or send it to a server for further processing
      const file: File = event.target.files[0];
      this.addMemberByExcel(file);
      console.log('Selected file:', file);
      // You can also access file properties like file.name, file.size, etc.
    }
  }
}
