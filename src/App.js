import React, { PureComponent } from "react";
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import getData, { columns } from "./data";

export default class App extends PureComponent {
  state = {
    open: false,
    data: [],
    row: null
  };

  handleClickOpen = row => {
    this.setState({ open: true, row });
  };

  handleClose = () => {
    this.setState({ open: false, row: null });
  };

  onRowClick = rowData => {
    this.handleClickOpen(rowData);
  };

  componentDidMount() {
    this.setState({
      data: getData(69)
    });
  }

  handleChange = name => e => {
    this.setState({ [name]: e.target.checked });
  };

  render() {
    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      onRowClick: this.onRowClick
    };

    const { data, open } = this.state;
    return (
      <>
        <MUIDataTable
          title={"Essays"}
          data={data}
          columns={columns}
          options={options}
        />
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>Edit essay</DialogTitle>
          <DialogContent>
            <DialogContentText>Essay details</DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="name"
              type="text"
              fullWidth
            />
            <TextField
              label="Multiline"
              multiline
              rows="4"
              defaultValue="Default Value"
              margin="normal"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={this.state.checkedB}
                  onChange={this.handleChange("featured")}
                  value="featured"
                  color="primary"
                />
              }
              label="featured"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
