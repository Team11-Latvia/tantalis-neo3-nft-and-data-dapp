import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

enum ContentType {
  TEXT = 'TEXT',
  IMAGE = 'IMAGE'
}

interface TextModalData {
  title: string;
  content: { type: ContentType, data: string }[];
}

@Component({
  selector: 'app-text-modal',
  templateUrl: './text-modal.component.html',
  styleUrls: ['./text-modal.component.scss']
})
export class TextModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public readonly dialogData: TextModalData,
    public readonly dialogRef: MatDialogRef<TextModalComponent>,
    public readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
    console.log(this.dialogData);
  }

  public close(): void {
    this.dialogRef.close();
  }
}
