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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Switch from "@material-ui/core/Switch";
import getData, {
  columns,
  years,
  colleges,
  statuses,
  countries,
  states
} from "./data";
import "./app.css";

export default class App extends PureComponent {
  state = {
    open: false,
    data: [],
    id: null,
    essay: null,
    prompt: null,
    college: null,
    year: null,
    status: null,
    name: null,
    email: null,
    country: null,
    state: null,
    featured: null,
    image: null,
    date: null,
    source: null,
    comments: null,
    views: null
  };

  handleClickOpen = row => {
    const [
      id,
      essay,
      prompt,
      college,
      year,
      status,
      name,
      email,
      country,
      state,
      featured,
      image,
      date,
      source,
      comments,
      views
    ] = row;
    this.setState({
      open: true,
      id,
      essay,
      prompt,
      college,
      year,
      status,
      name,
      email,
      country,
      state,
      featured,
      image,
      date,
      source,
      comments,
      views
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  onRowClick = rowData => {
    this.handleClickOpen(rowData);
  };

  componentDidMount = () => {
    this.setState({
      data: getData(69)
    });
  };

  handleChangeToggle = name => e => {
    this.setState({ [name]: e.target.checked });
  };

  handleChangeText = name => e => {
    this.setState({ [name]: e.target.value });
  };

  handleSave = () => {};

  render() {
    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      onRowClick: this.onRowClick
    };

    const {
      data,
      open,
      id,
      essay,
      prompt,
      college,
      year,
      status,
      name,
      email,
      country,
      state,
      featured,
      image,
      date,
      source,
      comments,
      views
    } = this.state;
    return (
      <>
        <MUIDataTable
          title="Essays Dashboard"
          data={data}
          columns={columns}
          options={options}
        />
        <Dialog open={open} onClose={this.handleClose}>
          <DialogTitle>Edit Essay</DialogTitle>
          <DialogContent>
            <form className="container">
              <fieldset>
                <legend>essay</legend>
                <TextField
                  label="id"
                  type="text"
                  value={id}
                  required
                  fullWidth
                  disabled
                />
                <TextField
                  onChange={this.handleChangeText("essay")}
                  label="essay"
                  type="text"
                  value={essay}
                  multiline
                  rows={5}
                  required
                  fullWidth
                />
                <TextField
                  onChange={this.handleChangeText("prompt")}
                  label="prompt"
                  type="text"
                  value={prompt}
                  multiline
                  rows={2}
                  required
                  fullWidth
                />
                <FormControl className="select" required fullWidth>
                  <InputLabel>college</InputLabel>
                  <Select
                    value={college}
                    onChange={this.handleChangeText("college")}
                  >
                    {colleges.map((college, idx) => (
                      <MenuItem key={idx} value={college}>
                        {college}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className="select" required fullWidth>
                  <InputLabel>Year</InputLabel>
                  <Select value={year} onChange={this.handleChangeText("year")}>
                    {years.map((year, idx) => (
                      <MenuItem key={idx} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className="select" required fullWidth>
                  <InputLabel>status</InputLabel>
                  <Select
                    value={status}
                    onChange={this.handleChangeText("status")}
                  >
                    {statuses.map((status, idx) => (
                      <MenuItem key={idx} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </fieldset>
              <fieldset>
                <legend>Author</legend>
                <TextField
                  onChange={this.handleChangeText("name")}
                  label="name"
                  type="text"
                  value={name}
                  required
                  fullWidth
                />
                <TextField
                  onChange={this.handleChangeText("email")}
                  label="email"
                  type="email"
                  value={email}
                  required
                  fullWidth
                />
                <FormControl className="select" required fullWidth>
                  <InputLabel>status</InputLabel>
                  <Select
                    value={status}
                    onChange={this.handleChangeText("status")}
                  >
                    {statuses.map((status, idx) => (
                      <MenuItem key={idx} value={status}>
                        {status}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl className="select" required fullWidth>
                  <InputLabel>country</InputLabel>
                  <Select
                    value={country}
                    onChange={this.handleChangeText("country")}
                  >
                    {countries.map((country, idx) => (
                      <MenuItem key={idx} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl className="select" required fullWidth>
                  <InputLabel>state</InputLabel>
                  <Select
                    value={state}
                    onChange={this.handleChangeText("state")}
                  >
                    {states.map((state, idx) => (
                      <MenuItem key={idx} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </fieldset>
              <fieldset>
                <legend>meta</legend>
                <FormControlLabel
                  control={
                    <Switch
                      checked={featured}
                      onChange={this.handleChangeToggle("featured")}
                      value={featured}
                      color="primary"
                    />
                  }
                  label="featured"
                  labelPlacement="top"
                />
                <TextField
                  onChange={this.handleChangeText("image")}
                  label="image"
                  type="number"
                  value={image}
                  required
                  fullWidth
                />
                <TextField
                  onChange={this.handleChangeText("date")}
                  label="date"
                  type="date"
                  value={date}
                  required
                  fullWidth
                />
                <TextField
                  onChange={this.handleChangeText("source")}
                  label="source"
                  type="url"
                  value={source}
                  required
                  fullWidth
                />
                <TextField
                  onChange={this.handleChangeText("comments")}
                  label="comments"
                  type="text"
                  value={comments}
                  fullWidth
                  multiline
                  rows={2}
                  required
                />
                <TextField
                  label="views"
                  type="number"
                  value={views}
                  fullWidth
                  disabled
                />
              </fieldset>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button onClick={this.handleClose} color="primary">
              save
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}
