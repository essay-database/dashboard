import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import axios from "axios";
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
import getData, { columns, years, statuses, countries, states } from "./data";
import isEqual from "lodash/isEqual";
import "./app.css";

function isString(value) {
  return typeof value === "string" || value instanceof String;
}

function isNumber(value) {
  return typeof value === "number" && isFinite(value);
}

function isBoolean(value) {
  return typeof value === "boolean";
}

const isValid = value =>
  (isString(value) && value.length > 0) ||
  (isNumber(value) && value > -1) ||
  isBoolean(value);

const format = value => (isString(value) ? value.trim() : value);

const deepClone = value => JSON.parse(JSON.stringify(value));

class App extends PureComponent {
  state = {
    open: false,
    data: [],
    dataIndex: -1,
    row: []
  };

  validateRow = row => row.every(value => isValid(value));

  formatRow = row => row.map(value => format(value));

  createRow = row => {
    row[0] = Date.now().toString();
    row[12] = new Date().toDateString();
    row[15] = 0;
    return row;
  };

  onRowClick = (_, { dataIndex }) => {
    this.setState(({ data }) => ({
      open: true,
      dataIndex,
      row: [...data[dataIndex]]
    }));
  };

  handleAdd = () => {
    this.setState(data => ({
      row: Array(16),
      open: true,
      dataIndex: data.length
    }));
  };

  handleClose = () => {
    this.setState(({ data, dataIndex, row }) => {
      if (this.validateRow(this.formatRow(row))) {
        if (row.length > 0)
          if (!isEqual(row, data[dataIndex]))
            if (window.confirm("abandon changes?")) return { open: false };
            else return {};
          else return { open: false };
        else return { open: false };
      }
    });
  };

  handleSave = () => {
    this.setState(({ dataIndex, data, row }) => {
      const newRow = this.createRow(row);
      if (this.validateRow(this.formatRow(row))) {
        if (dataIndex === data.length) data.push(newRow);
        else data[dataIndex] = row;
        return { data: deepClone(data), open: false };
      }
    });
  };

  handleChange = index => ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    this.setState(({ row }) => {
      row[index] = value;
      return { row: [...row] };
    });
  };

  fetchData = () => {
    const ENDPOINT_URL = "localhost:8080/essays";
    let results;
    try {
      ({ data: results } = axios.get(ENDPOINT_URL));
    } catch (error) {
      results = [];
    }
    return results;
  };

  async componentDidMount() {
    let data;
    if (this.props.env === "prod") data = await this.fetchData();
    else data = getData(69);
    this.setState({ data });
  }

  render() {
    const options = {
      filterType: "dropdown",
      responsive: "scroll",
      onRowClick: this.onRowClick,
      rowsPerPage: 15,
      rowsPerPageOptions: [15, 25, 50, 100]
    };
    const { data, row, open, dataIndex } = this.state;
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
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={this.handleAdd}
        >
          new
        </Button>
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
                  onChange={this.handleChange(1)}
                  label="essay"
                  type="text"
                  value={essay}
                  multiline
                  rows={10}
                  required
                  fullWidth
                  error={!isValid(essay)}
                />
                <TextField
                  onChange={this.handleChange(2)}
                  label="prompt"
                  type="text"
                  value={prompt}
                  multiline
                  rows={2}
                  required
                  fullWidth
                  error={!isValid(prompt)}
                />
                {/* TODO autocomplete or dropdown ? */}
                <TextField
                  onChange={this.handleChange(3)}
                  label="college"
                  type="text"
                  value={college}
                  required
                  fullWidth
                  error={!isValid(college)}
                />
                <FormControl
                  className={classes.formControl}
                  required
                  error={!isValid(year)}
                >
                  <InputLabel>Year</InputLabel>
                  <Select value={year} onChange={this.handleChange(4)}>
                    {years.map((year, idx) => (
                      <MenuItem key={idx} value={year}>
                        {year}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  className={classes.formControl}
                  required
                  error={!isValid(status)}
                >
                  <InputLabel>status</InputLabel>
                  <Select value={status} onChange={this.handleChange(5)}>
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
                  onChange={this.handleChange(6)}
                  label="name"
                  type="text"
                  value={name}
                  required
                  fullWidth
                  error={!isValid(name)}
                />
                <TextField
                  onChange={this.handleChange(7)}
                  label="email"
                  type="email"
                  value={email}
                  disabled={dataIndex < data.length}
                  required
                  fullWidth
                  error={!isValid(name)}
                />
                <FormControl
                  className={classes.formControl}
                  required
                  error={!isValid(country)}
                >
                  <InputLabel>country</InputLabel>
                  <Select value={country} onChange={this.handleChange(8)}>
                    {countries.map((country, idx) => (
                      <MenuItem key={idx} value={country}>
                        {country}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl
                  className={classes.formControl}
                  required
                  error={!isValid(state)}
                >
                  <InputLabel>state</InputLabel>
                  <Select value={state} onChange={this.handleChange(9)}>
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
                      onChange={this.handleChange(10)}
                      color="primary"
                    />
                  }
                  label="featured"
                />
                <TextField
                  onChange={this.handleChange(11)}
                  label="image"
                  type="number"
                  value={image}
                  required
                  fullWidth
                  error={!isValid(image)}
                />
                <TextField
                  label="date"
                  type="text"
                  value={date}
                  disabled
                  fullWidth
                />
                <TextField
                  onChange={this.handleChange(13)}
                  label="source"
                  type="url"
                  value={source}
                  required
                  fullWidth
                  error={!isValid(source)}
                />
                <TextField
                  onChange={this.handleChange(14)}
                  label="comments"
                  type="text"
                  value={comments}
                  fullWidth
                  multiline
                  rows={2}
                  required
                  error={!isValid(comments)}
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
            <Button onClick={this.handleClose} color="primary">
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
  button: {
    margin: theme.spacing.unit
  }
});

App.propTypes = {
  classes: PropTypes.object.isRequired,
  env: PropTypes.string.isRequired
};

export default withStyles(styles)(App);
