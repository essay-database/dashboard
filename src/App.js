import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import MUIDataTable from "mui-datatables";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import { withStyles } from "@material-ui/core/styles";
import "./app.css";
import getData, { columns, years, statuses, countries, states } from "./data";

class App extends PureComponent {
  state = {
    open: false,
    data: [],
    dataIndex: -1
  };

  onRowClick = (_, { dataIndex }) => {
    this.setState({
      open: true,
      dataIndex
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = () => {
    this.handleClose();
  };

  handleChangeToggle = index => e => {
    const { checked } = e.target;
    this.setState(({ data, dataIndex }) => {
      data[dataIndex][index] = checked;
      return { data: [...data] };
    });
  };

  handleChangeText = index => e => {
    const { value } = e.target;
    this.setState(({ data, dataIndex }) => {
      data[dataIndex][index] = value;
      return { data: [...data] };
    });
  };

  componentDidMount = () => {
    this.setState({
      data: getData(69)
    });
  };

  render() {
    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      onRowClick: this.onRowClick,
      rowsPerPage: 15,
      rowsPerPageOptions: [15, 25, 50, 100]
    };
    const { data, dataIndex, open } = this.state;
    const row = data[dataIndex] || [];
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
    const { classes } = this.props;
    return (
      <>
        <MUIDataTable
          title="Essays Dashboard"
          data={data}
          columns={columns}
          options={options}
        />
        <Dialog open={open} onClose={this.handleClose} fullWidth maxWidth="lg">
          <DialogTitle>Edit Essay</DialogTitle>
          <DialogContent>
            <form>
              <fieldset>
                <legend>Essay</legend>
                <TextField
                  onChange={this.handleChangeText(1)}
                  label="essay"
                  type="text"
                  value={essay}
                  multiline
                  rows={10}
                  required
                  fullWidth
                />
                <TextField
                  onChange={this.handleChangeText(2)}
                  label="prompt"
                  type="text"
                  value={prompt}
                  multiline
                  rows={2}
                  required
                  fullWidth
                />
                {/* TODO autocomplete/dropdown ? */}
                <TextField
                  onChange={this.handleChangeText(3)}
                  label="college"
                  type="text"
                  value={college}
                  required
                  fullWidth
                />
                <FormControl className={classes.formControl} required>
                  <InputLabel>Year</InputLabel>
                  <Select value={year} onChange={this.handleChangeText(4)}>
                    {years.map((year, idx) => (
                      <MenuItem key={idx} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl} required>
                  <InputLabel>status</InputLabel>
                  <Select value={status} onChange={this.handleChangeText(5)}>
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
                  onChange={this.handleChangeText(6)}
                  label="name"
                  type="text"
                  value={name}
                  required
                  fullWidth
                />
                <TextField
                  label="email"
                  type="email"
                  value={email}
                  disabled
                  fullWidth
                />
                <FormControl className={classes.formControl} required>
                  <InputLabel>country</InputLabel>
                  <Select value={country} onChange={this.handleChangeText(8)}>
                    {countries.map((country, idx) => (
                      <MenuItem key={idx} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl} required>
                  <InputLabel>state</InputLabel>
                  <Select value={state} onChange={this.handleChangeText(9)}>
                    {states.map((state, idx) => (
                      <MenuItem key={idx} value={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </fieldset>
              <fieldset>
                <legend>Meta</legend>
                <TextField
                  label="id"
                  type="text"
                  value={id}
                  required
                  fullWidth
                  disabled
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={Boolean(featured)}
                      onChange={this.handleChangeToggle(10)}
                      color="primary"
                    />
                  }
                  label="featured"
                />
                <TextField
                  onChange={this.handleChangeText(11)}
                  label="image"
                  type="number"
                  value={image}
                  required
                  fullWidth
                />
                <TextField
                  label="date"
                  type="text"
                  value={date}
                  disabled
                  fullWidth
                />
                <TextField
                  onChange={this.handleChangeText(13)}
                  label="source"
                  type="url"
                  value={source}
                  required
                  fullWidth
                />
                <TextField
                  onChange={this.handleChangeText(14)}
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
            <Button onClick={this.handleClose} className={classes.cancel}>
              Cancel
            </Button>
            <Button onClick={this.handleSave} color="primary">
              save
            </Button>
          </DialogActions>
        </Dialog>
      </>
    );
  }
}

const styles = theme => ({
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120
  },
  cancel: {
    color: "#9E9E9E"
  }
});

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
